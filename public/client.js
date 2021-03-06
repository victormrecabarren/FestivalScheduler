
const addListeners = (selection) => {
  for (let i = 0; i<selection.length; i++) {
    selection.eq(i).click((event) => {
      isChecked(event.target);
    })
  }
}

const starListeners = ($stars) => {
  for (let i = 0; i < $stars.length; i++) {
    $stars.eq(i).mouseenter((event) => {
      $(event.target).addClass('starred');
      let myId = +$(event.target).attr('id');
      for (let i=0; i < $(event.target).siblings().length; i++) {
        if (+$(event.target).siblings().eq(i).attr('id') < myId) {
          $(event.target).siblings().eq(i).addClass('starred');
        };
      };
    })

    $stars.eq(i).mouseleave((event) => {
      $(event.target).removeClass('starred');
      for (let i=0; i < $(event.target).siblings().length; i++) {
        $(event.target).siblings(i).removeClass('starred')
      }
    });

    $stars.eq(i).click((event) => {

      $(event.target).off('mouseenter');
      $(event.target).off('mouseleave');
      for (let i=0; i<$(event.target).siblings().length; i++) {
        $(event.target).siblings().eq(i).off('mouseenter');
        $(event.target).siblings().eq(i).off('mouseleave')
      }

        let myId = +$(event.target).attr('id');
        for (let i=0; i < $(event.target).siblings().length; i++) {
          if (+$(event.target).siblings().eq(i).attr('id') < myId) {
            $(event.target).siblings().eq(i).addClass('starred');
          } else if (+$(event.target).siblings().eq(i).attr('id') > myId) {
            $(event.target).siblings().eq(i).removeClass('starred')
          }
        };

        $(event.target).addClass('starred');
        /// save stars selected to input
        let starsGiven = $(event.target).parent().children().filter('.starred').length

        let $myArtist = $(event.target).parent().attr('id');
        let $myStarInput = $(`input[artist='${$myArtist}']`);
        $myStarInput.attr('value', starsGiven);
        console.log($(`input[artist='${$myArtist}']`));
        console.log(starsGiven);
        console.log($myArtist);
        console.log($myStarInput);

    })
  }
}

const updatePageInputs = (target) => {
  $(target).prop('checked', true);

  const $selected = $(':checked').filter('[class="selection"]');
  // console.log($selected);

  for (let i=0; i < $selected.length; i++) {
    let selectedStart = new Date($selected.eq(i).attr('starttime'));
    let selectedEnd = new Date($selected.eq(i).attr('endtime'));

      for (let j=0; j < $('.selection').length; j++) {
        // set time of compare items to js date objects
        let compareStart = new Date($('.selection').eq(j).attr('starttime'));
        let compareEnd = new Date($('.selection').eq(j).attr('endtime'));

        if (compareEnd > selectedStart && compareEnd < selectedEnd) {
          // disable conflicting
          $('.selection').eq(j).attr('disabled', 'disabled').parent().addClass('invisible')

          // check if time to see opening of conflicting
          if ((selectedStart - compareStart)/1000/60 >= 10) {
            //make opening box checkable
            $('.opening').eq(j).parent().parent().removeClass('hide');
            // change bg of header
              $('.opening').eq(j).parent().parent().parent().addClass('minishowbackground')
          };



            // .siblings().filter('.overTop').addClass('overTopInvisible')



          // check other type of configuration of conflicting
        } else if (compareStart < selectedEnd && compareStart > selectedStart) {

          //disable conflicting
          $('.selection').eq(j).attr('disabled', 'disabled').parent().addClass('invisible')

          // check if time to see finale of conflicting
          if ((compareEnd - selectedEnd)/1000/60 >=10) {
            //make finale box checkable
            $('.finale').eq(j).parent().parent().removeClass('hide');
            // change footer bg color
            $('.finale').eq(j).parent().parent().parent().addClass('minishowbackground')

          }

        }
      }
    }
  }

  const revertChanges = (target) => {
    console.log('running revertChanges');
    $(target).prop('checked', false);
    const $selected = $(target);

    let selectedStart = new Date($selected.attr('starttime'));
    let selectedEnd = new Date($selected.attr('endtime'));

    for (let i=0; i < $('.selection').length; i++) {

          // set time of compare items to js date objects
          let compareStart = new Date($('.selection').eq(i).attr('starttime'));
          let compareEnd = new Date($('.selection').eq(i).attr('endtime'));

          if (compareEnd > selectedStart && compareEnd < selectedEnd) {
            // disable conflicting
            console.log('about to un-disable: ', $('.selection').eq(i));
            $('.selection').eq(i).removeAttr('disabled').parent().removeClass('invisible')

            // check if time to see opening of conflicting
            if ((selectedStart - compareStart)/1000/60 >= 10) {

              $('.opening').eq(i).prop('checked', false);
              $('.opening').eq(i).parent().parent().addClass('hide');
              //remove header background
              $('.opening').eq(i).parent().parent().parent().removeClass('minishowbackground')
            }

            // check other type of configuration of conflicting
          } else if (compareStart < selectedEnd && compareStart > selectedStart) {

            //disable conflicting
            $('.selection').eq(i).removeAttr('disabled').parent().removeClass('invisible')

            // check if time to see finale of conflicting
            if ((compareEnd - selectedEnd)/1000/60 >=10) {
              //make finale box checkable
              $('.finale').eq(i).prop('checked', false);
              $('.finale').eq(i).parent().parent().addClass('hide');
              //change footer bg color back;
              $('.finale').eq(i).parent().parent().parent().removeClass('minishowbackground')

            }

          }
        }
      }




/// function to check if checked or unchecked, then redirect to correct function
const isChecked = (selected) => {
  if ($(selected).prop('checked') == true) {
    updatePageInputs(selected);
    $(selected).prop('checked', true);
  } else {
    revertChanges(selected, false);
    $(selected).prop('checked', false);
  };

};


// function to make previously conflicting acts display once again
// const showConflicting = (unselected) => {
//     console.log('going to display non conflicting acts now, since you unselected', unselected);
// }


$(() => {
  const $selection = $('.selection');
  addListeners($selection)

  const $stars = $('.fa');
  starListeners($stars)

  updatePageInputs();

  $('#unselect').click(() => {
    $(':checked').prop('checked', false)
  })

})
