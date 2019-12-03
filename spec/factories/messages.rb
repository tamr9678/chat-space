FactoryBot.define do
  factory :message do
    body {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/nyan_cat.png")}
    user
    group
  end
end