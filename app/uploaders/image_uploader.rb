class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :fog


  process resize_to_fit: [800, 800]

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end


  def extension_white_list
    %W[jpg jpeg gif png]
  end

end
