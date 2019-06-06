
const addListeners = (selection) => {
  for (let i = 0; i<selection.length; i++) {
    selection.eq(i).mouseup((event) => {
      isChecked(event.target);
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
          $('.selection').eq(j).attr('disabled', 'disabled');

          // check if time to see opening of conflicting
          if ((selectedStart - compareStart)/1000/60 >= 10) {
            //make opening box checkable
            $('.opening').eq(j).parent().removeClass('hide')
          }

          // check other type of configuration of conflicting
        } else if (compareStart < selectedEnd && compareStart > selectedStart) {

          //disable conflicting
          $('.selection').eq(j).attr('disabled', 'disabled')

          // check if time to see finale of conflicting
          if ((compareEnd - selectedEnd)/1000/60 >=10) {
            //make finale box checkable
            $('.finale').eq(j).parent().removeClass('hide')

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
            $('.selection').eq(i).removeAttr('disabled')

            // check if time to see opening of conflicting
            if ((selectedStart - compareStart)/1000/60 >= 10) {
              //make opening box checkable
              $('.opening').eq(i).prop('checked', false);
              $('.opening').eq(i).parent().addClass('hide')
            }

            // check other type of configuration of conflicting
          } else if (compareStart < selectedEnd && compareStart > selectedStart) {

            //disable conflicting
            $('.selection').eq(i).removeAttr('disabled')

            // check if time to see finale of conflicting
            if ((compareEnd - selectedEnd)/1000/60 >=10) {
              //make finale box checkable
              $('.finale').eq(i).prop('checked', false);
              $('.finale').eq(i).parent().addClass('hide')

            }

          }
        }
      }




/// function to check if checked or unchecked, then redirect to correct function
const isChecked = (selected) => {
  if (!$(selected).prop('checked') == true) {
    updatePageInputs(selected);
    $(selected).prop('checked', false);
  } else {
    revertChanges(selected, false);
    $(selected).prop('checked', true);
  };

};

// function to hide act whose schedule conflicts with selection made
// const hideConflicting = (selected) => {
//   /// create Date Objects based on attribute passed to input
//   let selectedStart = new Date($(selected).attr('starttime'))
//   let selectedEnd = new Date($(selected).attr('endtime'));
//
// // iterate through all other acts to compare their times to selected times
//   for (let i=0; i < $('.selection').length; i++) {
//     // set time of compare items to js date objects
//     let compareStart = new Date($('.selection').eq(i).attr('starttime'));
//     let compareEnd = new Date($('.selection').eq(i).attr('endtime'));
//
//     // check one type of configuration of conflicting schedule
//     if (compareEnd > selectedStart && compareEnd < selectedEnd) {
//       // disable conflicting
//       $('.selection').eq(i).attr('disabled', 'disabled')
//
//       // check if time to see opening of conflicting
//       if ((selectedStart - compareStart)/1000/60 >= 10) {
//         //make opening box checkable
//         $('.opening').eq(i).parent().removeClass('hide')
//       }
//
//       // check other type of configuration of conflicting
//     } else if (compareStart < selectedEnd && compareStart > selectedStart) {
//
//       //disable conflicting
//       $('.selection').eq(i).attr('disabled', 'disabled')
//
//       // check if time to see finale of conflicting
//       if ((compareEnd - selectedEnd)/1000/60 >=10) {
//         //make finale box checkable
//         $('.finale').eq(i).parent().removeClass('hide')
//
//       }
//     }
//   }
//

// }


//////


// function to make previously conflicting acts display once again
const showConflicting = (unselected) => {
    console.log('going to display non conflicting acts now, since you unselected', unselected);
}


$(() => {
  const $selection = $('.selection');
  addListeners($selection)
  updatePageInputs();

})
