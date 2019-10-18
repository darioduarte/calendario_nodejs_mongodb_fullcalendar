
class EventManager {
    constructor() {
        this.urlBase = "/events"
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
    }

    obtenerDataInicial() {
        let url = this.urlBase + "/all"
        $.get(url, (response) => {
            //console.log(response);
            this.inicializarCalendario(response)
        })
    }

    actualizarEvento(ev){
      var data
      if (ev.allDay === false) {
          data = {
          _id: ev._id,
          title: $('#titulo').val(),
          start: ev.start._d.toISOString(),
          end: ev.end._d.toISOString(),
          allDay: false
        }

          } else {
          data = {
          _id: ev._id,
          title: ev.title,
          start: ev.start._d.toISOString(),
          end: "",
          allDay: true
          }
        }
      let url = this.urlBase + "/update"
      $.post(url, data,(response) => {
        alert(response);
      })
    }

    eliminarEvento(evento) {
      console.log(evento,"eliminar");
        let eventId = evento._id
        $.post('/events/delete/'+eventId, {id: eventId}, (response) => {
            alert(response)
        })
    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            let nombre = $('#titulo').val(),
            start = $('#start_date').val(),
            title = $('#titulo').val(),
            end = '',
            start_hour = '',
            end_hour = '',
            allDay = "false";


            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour
                end = end + 'T' + end_hour
                allDay = false
            } else {
              end = $('#end_date').val()
              start_hour = $('#start_hour').val()
              end_hour = $('#end_hour').val()
              start = start
              end = ""
              allDay = true
            }
            let url = this.urlBase + "/new"
            if (title != "" && start != "") {
                let ev = {
                    title: title,
                    start: start,
                    end: end,
                    allDay:allDay
                }
                //console.log(ev);
                $.post(url, ev, (response) => {
                  this.obtenerDataInicial()
                    alert(response)
                })
                $('.calendario').fullCalendar('renderEvent', ev)
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }

    inicializarCalendario(eventos) {
      console.log(eventos);
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: new Date(),
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
              console.log(event, "drop");
                this.actualizarEvento(event)
            },
            events: eventos,
            eventDragStart: (event,jsEvent) => {
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
              console.log(event,"stop");
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        console.log(event);
                        $('.calendario').fullCalendar('removeEvents', event._id);
                        this.eliminarEvento(event)
                        this.obtenerDataInicial();
                    }
                }
            })
        }
    }

    const Manager = new EventManager()
