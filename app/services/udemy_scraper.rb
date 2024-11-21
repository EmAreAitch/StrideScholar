class UdemyScraper
  def initialize
    @browser_options = {
      browser_options: {
        'disable-blink-features': 'AutomationControlled',
        'disable-gpu': true,
        'disable-extensions': true,
        'disable-plugins': true,
        'disable-dev-shm-usage': true,
        'no-sandbox': true,
        'disable-background-networking': true,
        'disable-default-apps': true,
        'disable-sync': true,
        'disable-web-security': true,
        'blink-settings': 'imagesEnabled=false',
        'mute-audio': true,
        'single-process': true,
        'renderer-process-limit': 1,
        'max-active-webgl-contexts': 1,
        'incognito': true,
        'excludeSwitches': %w[enable-automation enable-logging],
        'useAutomationExtension': false,
        'disable-images': true
      },
      headless: "new",
      proxy: nil,    
      process_timeout: 30,
      timeout: 10
    }
  end

  def extract_course_details(course_url)
    retries = 3
    browser = Ferrum::Browser.new(**@browser_options)    
    begin    
      browser.headers.add({
        "User-Agent" => "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
      })
    
      browser.go_to(course_url)
      browser.network.wait_for_idle(timeout: 5)

      # Extract course title and description
      course_id = browser.at_css("body").attribute("data-clp-course-id")
      raise "Course not found" unless course_id
      @course = Course.find_or_initialize_by(platform: :udemy, platform_id: course_id.to_i)
      unless @course.persisted?
        course_title = extract_text(browser, 'h1[data-purpose="lead-title"]') || "Course title not found"
        course_description = extract_text(browser, 'div[data-purpose="safely-set-inner-html:description:description"]') || "Course description not found"
        course_duration = convert_to_hhmmss(browser.at_css("[data-purpose=curriculum-stats] > span > span > span").text)

        # Extract topics and subtopics
        topics = extract_topics(browser)
        @course.attributes=(
        {
          platform: :udemy,
          platform_id: course_id.to_i,
          title: course_title,
          description: course_description,
          duration: course_duration,
          topics_attributes: topics.reverse
        })
      end
      @course
    rescue Ferrum::TimeoutError, Ferrum::ProcessTimeoutError      
      retries -= 1
      retry unless retries.zero?      
      @course.errors.add(:course_url, "Server Timeout... Please Try Again")
      @course
    rescue RuntimeError => e
      @course.errors.add(:course_url, e.message)
      @course
    ensure
      browser&.quit
    end
  end  

  private

  # Freeze static strings to save memory
  VIDEO_TYPE = :video.freeze
  ARTICLE_TYPE = :article.freeze
  QUIZ_TYPE = :quiz.freeze
  CODE_TYPE = :project.freeze
  UNKNOWN_TYPE = :other.freeze
  NO_TOPIC_TITLE = "No topic title found".freeze
  NO_SUBTOPIC_TITLE = "No subtopic title found".freeze

  def extract_text(browser, selector)
    element = browser.at_css(selector)
    element&.text&.strip
  end

def convert_to_hhmmss(time_string)
  return "00:00:00".freeze unless time_string

  # Initialize components
  hours, minutes, seconds = 0, 0, 0

  # Match hours with "hr" or "h", allowing for space or no space
  if time_string.match?(/\d+\s*(hr|h)\b/)
    hours = time_string[/(\d+)\s*(hr|h)\b/, 1].to_i
  end

  # Match minutes with "min" or "m", allowing for space or no space
  if time_string.match?(/\d+\s*(min|m)\b/)
    minutes = time_string[/(\d+)\s*(min|m)\b/, 1].to_i
  end

  # Match colon-separated formats (HH:MM:SS)
  if time_string.include?(':')
    parts = time_string.split(':').map(&:to_i)
    seconds = parts.pop || 0
    minutes += parts.pop || 0
    hours += parts.pop || 0
  end

  # Format the result
  hours.hours + minutes.minutes + seconds.seconds  
end




  def extract_topics(browser)
    topics = []
    browser.evaluate('document.querySelector("[data-purpose=show-more]")?.click()')
    browser.network.wait_for_idle(timeout: 10)          
    browser.css('.accordion-panel-module--panel--Eb0it.section--panel--qYPjj').each do |topic_parent|
      topic_title = extract_text(topic_parent, ".section--section-title--svpHP") || NO_TOPIC_TITLE

      # Extract topic duration
      topic_duration_element = topic_parent.at_css('[data-purpose="section-content"] span')
      topic_duration = topic_duration_element ? convert_to_hhmmss(topic_duration_element.text.strip) : "00:00:00".freeze

      # Extract subtopics
      subtopics = extract_subtopics(topic_parent)

      topics << {
        title: topic_title,
        duration: topic_duration,
        topic_type: :chapter,
        topics_attributes: subtopics.reverse,
        course: @course
      }
    end

    topics
  end

  def extract_subtopics(topic_parent)
    subtopics = []
    subtopic_list = topic_parent.at_css('.ud-unstyled-list.ud-block-list')

    return subtopics unless subtopic_list

    subtopic_list.css('li').each do |subtopic|
      subtopic_title = (subtopic.at_css('span').text.strip rescue NO_SUBTOPIC_TITLE)

      # Determine content type
      content_type = determine_content_type(subtopic)

      # Extract duration
      duration_element = subtopic.at_css('[class*=item-content-summary]')
      duration = duration_element ? convert_to_hhmmss(duration_element.text.strip) : "00:00:00".freeze

      subtopics << {
        title: subtopic_title,
        topic_type: content_type,
        duration: duration,
        course: @course
      }
    end

    subtopics
  end

  def determine_content_type(subtopic)
    svg_use = subtopic.at_css('svg use')
    return UNKNOWN_TYPE unless svg_use

    case svg_use.attribute('xlink:href')
    when "#icon-video" then VIDEO_TYPE
    when "#icon-article" then ARTICLE_TYPE
    when "#icon-lightbulb-off" then QUIZ_TYPE
    when "#icon-code" then CODE_TYPE
    else UNKNOWN_TYPE
    end
  end
end