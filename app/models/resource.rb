class Resource < ApplicationRecord
  belongs_to :topic
  belongs_to :user
  belongs_to :room

  has_one_attached :file
  
  enum resource_type: {
    link: 0,
    image: 1,
    video: 2,
    document: 3
  }

  validates :title, presence: true
  validates :resource_type, presence: true
  validates :url, presence: true, if: :link?
  validates :file, presence: true, if: :requires_file?
  # validates :file, blob: {content_type: {
  #   in: %w[image/jpeg image/png image/gif video/mp4 application/pdf],
  #   message: 'must be a valid file format'
  # }}, if: :file_attached?

  private

  def requires_file?
    image? || video? || document?
  end

  def file_attached?
    file.attached?
  end
end