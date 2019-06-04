
const addListeners = (selection) => {
  for (let i = 0; i<selection.length; i++) {
    selection.eq(i).mouseup((event) => {
      isChecked(event.target);
    })
  }
}


/// function to check if checked or unchecked, then redirect to correct function
const isChecked = (selected) => {
  if (!$(selected).prop('checked') == true) {
    hideConflicting(selected)
  } else {
    showConflicting(selected)
  };
};

// function to hide act whose schedule conflicts with selection made
const hideConflicting = (selected) => {
  /// create Date Objects based on attribute passed to input
  selectedStart = new Date($(selected).attr('starttime'))
  selectedEnd = new Date($(selected).attr('endtime'));

// iterate through all other acts to compare their times to selected times
  for (let i=0; i < $('.selection').length; i++) {
    // line inside of conditional creates date objects of elements we are checking in array
    // currently just checking if starts later to make sure working. need to devise logic to identify "conflicting"
    let compareStart = new Date($('.selection').eq(i).attr('starttime'));
    let compareEnd = new Date($('.selection').eq(i).attr('endtime'));


    if (compareEnd > selectedStart && compareEnd < selectedEnd) {
      console.log('this show ends after i start, but it also before i do. in other words, its happening at the same time as me. ');
      console.log($('.selection').eq(i));
    } else if (compareStart < selectedEnd && compareStart > selectedStart) {
      console.log('this show starts before I end, but after I start. in other words, it starts in the middle of my show');
      console.log($('.selection').eq(i));
    }
  }





  // temp work space variables
  mystart = selectedStart
  myend = selectedEnd
}

// temp work space
let mystart;
let myend;

//////


// function to make previously conflicting acts display once again
const showConflicting = (unselected) => {
    console.log('going to display non conflicting acts now, since you unselected', unselected);
}


$(() => {
  const $selection = $('.selection');
  addListeners($selection)

})
