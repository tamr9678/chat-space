json.id @message.id
json.user_name @message.user.name
json.body @message.body
json.image @message.image
json.created_at @message.created_at.strftime("%Y/%m/%d(%a) %H:%M")
json.user_id @message.user_id
json.group_id @message.group_id
