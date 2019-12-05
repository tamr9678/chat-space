$(function(){
  var buildHTML = function(message) {
    if (message.body && message.image.url) {
      var html = `<div class="message" data-id=` + message.id + `>` +
        `<div class="message-info">` +
          `<div class="message-info__name">` +
            message.user_name +
          `</div>` +
          `<div class="message-info__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<p class="lower-message__content">` +
            message.body +
          `</p>` +
          `<img src="` + message.image.url + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    } else if (message.body) {
      var html = `<div class="message" data-id=` + message.id + `>` +
        `<div class="message-info">` +
          `<div class="message-info__name">` +
            message.user_name +
          `</div>` +
          `<div class="message-info__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<p class="lower-message__content">` +
            message.body +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image.url) {
      var html = `<div class="message" data-id=` + message.id + `>` +
        `<div class="message-info">` +
          `<div class="message-info__name">` +
            message.user_name +
          `</div>` +
          `<div class="message-info__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<img src="` + message.image.url + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };

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

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data('id');
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.chat-main__message-list').append(insertHTML);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    })
    .fail(function() {
      console.log('error');
    });
  };
  var pathname = location.pathname.match(/messages/)
  var reg = RegExp(pathname);
  if(reg.test("messages")){
    setInterval(reloadMessages, 7000);
  }
});
