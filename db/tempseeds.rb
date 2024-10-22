# db/seeds.rb

# Clear existing data
Course.destroy_all
Topic.destroy_all

# Helper method to create a duration interval
def create_duration(hours, minutes = 0)
  ActiveSupport::Duration.build(hours * 3600 + minutes * 60)
end

# Create courses
courses = [
  {
    title: "Introduction to Web Development",
    description: "Learn the basics of web development, including HTML, CSS, and JavaScript.",
    duration: create_duration(30) # 30 hours total
  },
  {
    title: "Advanced Ruby on Rails",
    description: "Master Ruby on Rails framework for building robust web applications.",
    duration: create_duration(40) # 40 hours total
  },
  {
    title: "Data Science Fundamentals",
    description: "Explore the core concepts of data science and machine learning.",
    duration: create_duration(45) # 45 hours total
  }
]

created_courses = courses.map { |course_data| Course.create!(course_data) }

# Create topics and subtopics for each course
created_courses.each do |course|
  case course.title
  when "Introduction to Web Development"
    html = Topic.create!(title: "HTML Basics", topic_type: 0, duration: create_duration(8), topicable: course)
    Topic.create!([
      { title: "HTML Structure", topic_type: 1, duration: create_duration(2), topicable: html },
      { title: "HTML Tags", topic_type: 1, duration: create_duration(3), topicable: html },
      { title: "HTML Forms", topic_type: 1, duration: create_duration(3), topicable: html }
    ])

    css = Topic.create!(title: "CSS Fundamentals", topic_type: 0, duration: create_duration(10), topicable: course)
    Topic.create!([
      { title: "CSS Selectors", topic_type: 1, duration: create_duration(3), topicable: css },
      { title: "CSS Box Model", topic_type: 1, duration: create_duration(3), topicable: css },
      { title: "CSS Layouts", topic_type: 1, duration: create_duration(4), topicable: css }
    ])

    js = Topic.create!(title: "JavaScript Essentials", topic_type: 0, duration: create_duration(12), topicable: course)
    Topic.create!([
      { title: "JavaScript Syntax", topic_type: 1, duration: create_duration(4), topicable: js },
      { title: "DOM Manipulation", topic_type: 1, duration: create_duration(4), topicable: js },
      { title: "Event Handling", topic_type: 1, duration: create_duration(4), topicable: js }
    ])

  when "Advanced Ruby on Rails"
    mvc = Topic.create!(title: "MVC Architecture", topic_type: 0, duration: create_duration(10), topicable: course)
    Topic.create!([
      { title: "Models", topic_type: 1, duration: create_duration(3), topicable: mvc },
      { title: "Views", topic_type: 1, duration: create_duration(3), topicable: mvc },
      { title: "Controllers", topic_type: 1, duration: create_duration(4), topicable: mvc }
    ])

    ar = Topic.create!(title: "Advanced Active Record", topic_type: 0, duration: create_duration(15), topicable: course)
    Topic.create!([
      { title: "Associations", topic_type: 1, duration: create_duration(5), topicable: ar },
      { title: "Querying", topic_type: 1, duration: create_duration(5), topicable: ar },
      { title: "Callbacks", topic_type: 1, duration: create_duration(5), topicable: ar }
    ])

    testing = Topic.create!(title: "Testing in Rails", topic_type: 0, duration: create_duration(15), topicable: course)
    Topic.create!([
      { title: "Unit Testing", topic_type: 1, duration: create_duration(5), topicable: testing },
      { title: "Integration Testing", topic_type: 1, duration: create_duration(5), topicable: testing },
      { title: "System Testing", topic_type: 1, duration: create_duration(5), topicable: testing }
    ])

  when "Data Science Fundamentals"
    stats = Topic.create!(title: "Statistical Concepts", topic_type: 0, duration: create_duration(15), topicable: course)
    Topic.create!([
      { title: "Descriptive Statistics", topic_type: 1, duration: create_duration(5), topicable: stats },
      { title: "Inferential Statistics", topic_type: 1, duration: create_duration(5), topicable: stats },
      { title: "Hypothesis Testing", topic_type: 1, duration: create_duration(5), topicable: stats }
    ])

    ml = Topic.create!(title: "Machine Learning Basics", topic_type: 0, duration: create_duration(20), topicable: course)
    Topic.create!([
      { title: "Supervised Learning", topic_type: 1, duration: create_duration(7), topicable: ml },
      { title: "Unsupervised Learning", topic_type: 1, duration: create_duration(7), topicable: ml },
      { title: "Model Evaluation", topic_type: 1, duration: create_duration(6), topicable: ml }
    ])

    viz = Topic.create!(title: "Data Visualization", topic_type: 0, duration: create_duration(10), topicable: course)
    Topic.create!([
      { title: "Matplotlib", topic_type: 1, duration: create_duration(3), topicable: viz },
      { title: "Seaborn", topic_type: 1, duration: create_duration(3), topicable: viz },
      { title: "Interactive Visualizations", topic_type: 1, duration: create_duration(4), topicable: viz }
    ])
  end
end

puts "Seed data created successfully!"
puts "Created #{Course.count} courses"
puts "Created #{Topic.where(topic_type: 0).count} main topics"
puts "Created #{Topic.where(topic_type: 1).count} subtopics"