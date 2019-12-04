$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = `
                  <div class= "message">
                    <div class = message-info>
                      <div class = message-info_name>
                        <%= message.user.name %>
                      </div>
                      <div class = mesage-info__date>
                        <%= message.created_at.strftime("%Y/%m/%d %H:%M")
                      </div>
                    </div>
                    <div class = "contents__body">
                      <%= message.body %>
                    </div>
                    <div clas = "lower-message__image">
                      <%= image_tag message.image.url %>
                    </div>
                  </div>  
                  `
    } else {
      var html =  ` 
                    <div class= "message">
                      <div class = message-info>
                        <div class = message-info_name>
                          <%= message.user.name %>
                        </div>
                        <div class = mesage-info__date>
                          <%= message.created_at.strftime("%Y/%m/%d %H:%M")
                        </div>
                      </div>
                      <div class = "contents__body">
                        <%= message.body %>
                      </div>
                    </div>  
                  `
    }
    return html
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
      $('.comments').append(html);
      $('.textbox').val('');
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  })
})