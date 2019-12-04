$(function(){
  function buildHTML(message){
    console.log(message != null);
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image.present) {
      var html = `<div class= "message">
                    <div class = "message-info">
                      <div class = "message-info__name">
                        ${message.user_name} 
                      </div>
                      <div class = "mesage-info__date">
                        ${message.created_at}.strftime("%Y/%m/%d %H:%M")
                      </div>
                    </div>
                    <div class = "contents__body">
                      <p class = "message_text"> ${message.body} </p>
                      <img src = ${message.image.url} class = "message__image" />
                    </div>
                  </div>`
    } else {
      var html = `<div class= "message">
                    <div class = "message-info">
                      <div class = "message-info_name">
                        ${message.user_name} 
                      </div>
                      <div class = "mesage-info__date">
                        ${message.created_at}.strftime("%Y/%m/%d %H:%M")
                      </div>
                    </div>
                    <div class = "contents__body">
                      <p class = "message_text"> ${message.body} </p>
                    </div>
                  </div>`
    }
    return html
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    console.log(this);
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.chat-main__message-list').val('');
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  })
})