(function($){
	
	window.ChatService = new function ChatService() {
		
		var ENDERECO_API = 'http://localhost:3000/api/';
		
		var contextoConversacao = {};
		var listenersConversa = [];
		
		this.mensagem = function(msg) {

			var payload = {
				input: {
					text: msg 
				},
				context: contextoConversacao
			};
			
			$.ajax(ENDERECO_API + 'conversation/', {
				data: JSON.stringify(payload), 
				contentType : 'application/json', 
				type : 'POST'
			}).done(function(dado){
				console.log('Retorno do servidor de conversação', dado);
				contextoConversacao = dado.context;
				listenersConversa.forEach(function(listener){
					listener(dado.output.text[0], dado);
				});
			}).fail(function(textStatus, errorThrown){
				console.error('Erro ao comunicar com o servidor de conversação', textStatus, errorThrown);
			});
		
		};
		
		this.registraListenerConversa = function(listener) {
			listenersConversa.push(listener);
		}
		
	};
	
})(jQuery);