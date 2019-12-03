json.set! :message do
  json.id message.id
  json.body message.body
  json.image message.image
  json.user_id message.user_id
  json.group_id message.group_id
end