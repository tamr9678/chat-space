$(function(){
  function buildHTML(message){
    if (message.image.url !=  null) {
      var html = `<div class="message">
                    <div class="message-info">
                      <div class="message-info__name">
                        ${message.user_name}
                      </div>
                      <div class="message-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="contents__body">
                      <p class="message_text">
                        ${message.body}
                      </p>
                      <img class="lower-message__image" src=${message.image.url} >
                    </div>
                  </div>`     
    } else {
      var html = `<div class="message">
                    <div class="message-info">
                      <div class="message-info__name">
                        ${message.user_name}
                      </div>
                      <div class="message-info__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="contents__body">
                      <p class="message_text">
                        ${message.body}
                      </p>
                    </div>
                  </div>`
    }
    return html
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url, 
      type: 'POST',  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.form-contents__send-btn').removeAttr('disabled');
    });
  })
})
