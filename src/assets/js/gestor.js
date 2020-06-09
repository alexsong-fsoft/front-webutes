var Gestor = {
	fn:{
		getRequest: function (url, param, config) {
	        var param = param || {};
	        var config = config || {};
	        var resp = undefined;
	        $.ajax({
	            async: config.async || false,
	            type: 'GET',
	            url: url,
	            data: param,
	            datatype: 'json',
	            beforeSend: config.beforeSend || function () {
	                //console.log(url + 'before');
	            	if(config.loading) $("#upload-load").css('display', 'block');            	
	            },
	            success: config.success || function (data) {
	                //console.log(url + 'success');
	            	if(config.loading) $("#upload-load").css('display', 'none');
	                resp = data;
	            },
	            error: config.error || function (e) {
	                //console.log('error');
	            	if(config.loading) $("#upload-load").css('display', 'none');
	                console.log(e);
	                resp = false;
	            }
	        });
	        if(config.loading) $("#upload-load").css('display', 'none');
	        return resp;
	    },
	    postRequest: function (url, param, config) {
	        var param = param || {};
	        var config = config || {};
	        var resp = undefined;
	        var processData = (typeof config.processData != 'undefined') ? config.processData : true;
	        var contentType = (typeof config.contentType != 'undefined') ? config.contentType : 'application/x-www-form-urlencoded; charset=UTF-8';
	        if (contentType == "application/json; charset=utf-8" && typeof param == "object") {
	            param = JSON.stringify(param);
	        }
	        $.ajax({
	            async: config.async || false,
	            cache: config.cache || false,
	            type: 'POST',
	            url: url,
	            data: param,
	            datatype: 'json',
	            processData: processData,
	            contentType: contentType,
	            beforeSend: config.beforeSend || function () {
	                //console.log('before');
	            	if(config.loading) $("#upload-load").css('display', 'block');
	            },
	            success: config.success || function (data) {
	                //console.log('success');
	            	if(config.loading) $("#upload-load").css('display', 'none');
	                resp = data;
	            },
	            error: function (e) {
	                //console.log('error');
	                console.log(e);
	                if(config.loading) $("#upload-load").css('display', 'none');
	                resp = false;
	            }
	        });
	        if(config.loading) $("#upload-load").css('display', 'none');
	        return resp;
	    },
	    postRequest2: function(url, param, config) {
	    	var param = param || {};
	        var config = config || {};
	        var resp = undefined;
	        var processData = (typeof config.processData != 'undefined') ? config.processData : true;
	        var contentType = (typeof config.contentType != 'undefined') ? config.contentType : false; //'application/x-www-form-urlencoded; charset=UTF-8';
	        if (contentType == "application/json; charset=utf-8" && typeof param == "object") {
	            param = JSON.stringify(param);
	        }
	        $.ajax({
	        	async: config.async || false,
	            cache: config.cache || false,
	            type: 'POST',
	            url: url,
	            data: param,
	            processData: processData,
	            contentType: contentType,
	            headers: {
	                'Accept': 'application/json',
	                'Content-Type': 'application/json'
	            },
	            beforeSend: config.beforeSend || function () {
	                //console.log('before');
	            	if(config.loading) $("#upload-load").css('display', 'block');
	            },
	            complete: function(data) {
	            	if(config.loading) $("#upload-load").css('display', 'none');
	            	resp = data;
	            },
	            error: function (e) {
	                //console.log('error');
	            	if(config.loading) $("#upload-load").css('display', 'none');
	                console.log(e);
	                resp = false;
	            }            
	        });
	        if(config.loading) $("#upload-load").css('display', 'none');
	        return resp;
	    },
		ddmmyyyyStrToDate: function(ddmmyyyyStr) {
			var dateParts = []; 
			if(ddmmyyyyStr.includes("/"))
				dateParts = ddmmyyyyStr.split("/");
			else if (ddmmyyyyStr.includes("-"))
				dateParts = ddmmyyyyStr.split("-");
			else 
				return new Date();
			return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]); 
		},
		mmddyyyyStrToDate: function(mmddyyyyStr) {
			var dateParts = []; 
			if(mmddyyyyStr.includes("/"))
				dateParts = mmddyyyyStr.split("/");
			else if (mmddyyyyStr.includes("-"))
				dateParts = mmddyyyyStr.split("-");
			else 
				return new Date();
			return new Date(dateParts[2], dateParts[0] - 1, dateParts[1]); 
		},
		initForms: function(formid){
			try{
				if (formid) {
					$('#' + formid).submit(function(){
						$("button[type='submit']", this).text("Por favor, espere...").attr('disabled', 'disabled');
				    	return true;
					});
				}
				
				$('.date-picker').datepicker({
					clearBtn: true,
					//autoclose: true,
					todayHighlight: true,
					format: 'dd/mm/yyyy'	                
				});
				$('.date-picker').mask('99/99/9999');
				$('.date-picker').attr('placeholder','dd/mm/yyyy');
				/*$('.date-picker').focus(function() {
					var popup = $(this).offset();
		 					var popupTop = popup.top + 30;
		 					$('.datepicker').css({
		 						'top' : popupTop
		 					});
				});*/
				/*$('.date-picker').focusout(function() {
					$('.datepicker').css({
		 						'display' : 'none'
		 					});
				});*/

				$("table tr").click(function(){
				    $(this).addClass("selected").siblings().removeClass("selected");
				});
				
				$('tbody>tr>td>input:radio').click(function(){
					$(this).parents('tr').addClass("selected_chk").siblings().removeClass("selected_chk");
				});

				$('tbody>tr>td>input:checkbox').click(function(){
					if($(this).prop('checked')){
						$(this).parents('tr').addClass("selected_chk");
					}else{
						$(this).parents('tr').removeClass("selected_chk");
					}							
				});

				$("table.tbl_radio tr").dblclick(function(){
					$(this).find('input:radio').trigger('click');
				});
				
				$("table.tbl_chk tr").dblclick(function(){
					$(this).find('input:checkbox').trigger('click');
				});

				$('table.tbl_chk input.chk_all_row').change(function() {
					var checked = $(this).prop('checked');
					$(this).parents('table').find('input:checkbox').each(function() {
				  		if(this.checked != checked){
				  			$(this).trigger('click');
				  		}
			      		//this.checked = checked;
			    	});						  	
				});
				
				/*Scroll en la parte superior de las tablas*/
				var wrapper = '<div class="wrapper1"> \
							  	<div class="div1"></div> \
							  </div>'
				$('.table-scroll').prepend(wrapper);
				$('.table-scroll .wrapper1 .div1').width($('table.table-efx').width());
				$(".wrapper1").scroll(function() {
					$(".table-scroll .table-wrap").scrollLeft($(".wrapper1").scrollLeft());
				});
				$(".table-scroll .table-wrap").scroll(function() {
					$(".wrapper1").scrollLeft($(".table-scroll .table-wrap").scrollLeft());
				});
				
				
			}catch(e){
				console.log('init forms' + e);
			}

		},
		initLogin: function(){
			var current = null;
			document.querySelector('#email').addEventListener('focus', function (e) {
				if (current) current.pause();
				current = anime({
					targets: 'path',
					strokeDashoffset: {
						value: 0,
						duration: 700,
						easing: 'easeOutQuart'
					},
					strokeDasharray: {
						value: '240 1386',
						duration: 700,
						easing: 'easeOutQuart'
					}
				});
			});
			document.querySelector('#password').addEventListener('focus', function (e) {
				if (current) current.pause();
				current = anime({
					targets: 'path',
					strokeDashoffset: {
						value: -336,
						duration: 700,
						easing: 'easeOutQuart'
					},
					strokeDasharray: {
						value: '240 1386',
						duration: 700,
						easing: 'easeOutQuart'
					}
				});
			});
			document.querySelector('#submit').addEventListener('focus', function (e) {
				if (current) current.pause();
				current = anime({
					targets: 'path',
					strokeDashoffset: {
						value: -730,
						duration: 700,
						easing: 'easeOutQuart'
					},
					strokeDasharray: {
						value: '530 1386',
						duration: 700,
						easing: 'easeOutQuart'
					}
				});
			});
			// setTimeout(() => {
			// 	document.getElementById('email').focus();
			// }, 300);
		},
		positionDialog: function(){			    
			setTimeout(function() {
				$(".ui-dialog.ui-widget.ui-widget-content").position({
				  	of: $(".page-content" ),
				  	my: "center top",
				  	at: "center top"
				});
				$('div.ui-dialog-content.ui-widget-content').css('overflow-x', 'hidden');				
			}, 300);
		}
		
	},
	
	SAlert: {
    	show: function (type, title, message, config, fn) {
    		try {
    			if (type) {
                    if (type != 'info' && type != 'success' && type != 'warning' && type != 'error') {
                        console.log('bad type message. Type must be: info, success, warning, or error. Try again!');
                    } else {
                    	config = typeof config != 'undefined' ? config : {}; 
                    	var buttons = false;
                    	if (typeof config.buttons == 'object'){
                    		buttons = {
                			    cancel: {
                			        text: "Cancel",
                			        value: null,
                			        visible: false,
                			        className: "",
                			        closeModal: true,
                			    },
                			    confirm: {
                			        text: "OK",
                			        value: true,
                			        visible: true,
                			        className: "",
                			        closeModal: true
                			    }
                			};
                    		for (var property in config.buttons) {
                    		    if (config.buttons.hasOwnProperty(property)) {
                    		    	if(buttons[property] != undefined){
                    		    		buttons[property].text = config.buttons[property].text || buttons[property].text;
                    		    		buttons[property].value = config.buttons[property].value || buttons[property].value;
                    		    		buttons[property].visible = config.buttons[property].visible || buttons[property].visible;
                    		    		buttons[property].className = config.buttons[property].className || buttons[property].className;
                    		    		buttons[property].closeModal = config.buttons[property].closeModal || buttons[property].closeModal;
                    		    	} else{
                    		    		buttons[property] = config.buttons[property];
                    		    	}
                    		    }
                    		}
                    	}
                    	
                    	var timer = ((typeof config.timer != undefined) && buttons == false) ? config.timer : null; 
                    	var message = Gestor.Lang.messages[message] || message;
                    	var title = Gestor.Lang.messages[title] || title;
                		
                    	swal({
            			  title: title,
            			  text: message,
            			  icon: type,
            			  //button: button,
            			  buttons: buttons,
            			  content: config.content || null,
            			  closeOnClickOutside: config.closeOnClickOutside || true,
            			  closeOnEsc: config.closeOnEsc || true,
            			  dangerMode: config.dangerMode || false,
            			  timer: timer || null
            			}).then(function(result){
            				//sweetAlert.close();
            				if(fn != undefined){
            					$('div.swal-overlay').removeClass('swal-overlay--show-modal');
                				if (config.loading) $("#upload-load").css('display', 'block');
                				setTimeout(function(){
                					fn(result);
                					if (config.loading) $("#upload-load").css('display', 'none');
                				}, 300);
            				}
                        });
                    	
                    }
                } else {
                    console.log('type undefined');
                }
            } catch (ex) {
                console.log('Gestor.SAlert.show');
                console.log(ex);
            }
            
    	}
    },
    
    Lang: {
        messages: {
            autenticate: 'Autentifiquese',
            consulting: 'Consultando, un momento por favor...',
            complete_all_fields: 'Complete todos los campos',
            codigo_required: 'Código Requerido',
            confirm_delete: 'Está seguro de eliminar este registro.?',
            confirm_delete_all: 'Está seguro de eliminar estos registros.?',
            dates_cant_be_equals: 'Fechas no pueden ser iguales',
            date_greater_than_today: 'La fecha no puede ser mayor a la de hoy',
            delete_cliente: 'Eliminar Cliente',
            delete_clientes: 'Eliminar Clientes',
            error: 'Lamentamos informar problemas',
            init_date_cant_be_equals_end_date: 'Fecha Inicial no puede ser igual que la Fecha Final',
            init_date_cant_be_after_end_date: 'Fecha Inicial no puede ser mayor que la Fecha Final',
            input_data: 'Ingrese los datos',
            invalid_user: 'Usuario Invalido',
            not_files: 'Sin Archivos',
            password_updated: 'Clave actualizada',
            processing: 'Procesando...',
            register_saved: 'Registro guardado satisfactoriamente',
            register_loaded: 'Registro cargado',
            register_not_saved: 'Registro no guardado',
            register_deleted: 'Registro eliminado',
            register_deleted_all: 'Registros eliminados',
            register_not_deleted: 'Registro(s) no eliminado(s)',
            searching: 'Consultando, un momento por favor...',
            search_finished: 'Consulta realizada con éxito.',
            saving: 'Grabando...',
            succesfull: 'Proceso Correcto',
            success_search: 'Consulta satisfactoria',
            user_autenticated: 'Usuario validado',
            validating_user: 'Validando Usuario, un momento por favor',
            wants_to_delete_file_selected: 'Desea eliminar el archivo seleccionado?'
        }
    },
    
    Util: {
        fullScreen: function () {
            if ((document.fullScreenElement && document.fullScreenElement !== null) ||
                (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                if (document.documentElement.requestFullScreen) {
                    document.documentElement.requestFullScreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullScreen) {
                    document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        }
    },

	efxGrid: {
		addRow: function(table, dataRow){
			var columns = Gestor.efxGrid.getColumnsName(table);
			var trHtml = '<tr>';
			for(var i = 0; i < columns.length; i++){
				var valor = dataRow[columns[i].name] || '';
				trHtml += '<td class="' + columns[i].clase + '">' + valor + '</td>';
			}
			trHtml += '</tr>';
			table.find('tbody').append(trHtmnl);
		},
		getColumnsName: function(table){
			var columns = new Array();
			table.find('th[colName]').each(function() {
				columns.push({
					name: $(this).attr('colName'),
					clase: $(this).attr('class') || ''
				});
			});
			return columns;
		}
	}
}
