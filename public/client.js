
const addListeners = (selection) => {
  for (let i = 0; i<selection.length; i++) {
    selection.eq(i).mouseup((event) => {
      isChecked(event.target);
    })
  }
}

const isChecked = (selected) => {
  if (!$(selected).prop('checked') == true) {
    hideConflicting(selected)
  } else {
    showConflicting(selected)
  };
};

const hideConflicting = (selected) => {
  console.log('going to hide conflicting acts now, since you selected', selected);
}

const showConflicting = (unselected) => {
    console.log('going to display non conflicting acts now, since you unselected', unselected);
}


$(() => {
  const $selection = $('.selection');
  addListeners($selection)

})
