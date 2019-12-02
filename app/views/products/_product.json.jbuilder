json.extract! product, :id, :body, :image, :created_at, :updated_at
json.url product_url(product, format: :json)
