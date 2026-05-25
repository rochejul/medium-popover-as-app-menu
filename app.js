async function setup() {
  const mainpopover = document.querySelector('.menu__mainpopover');
  const subcontainers = Array.from(
    document.querySelectorAll('.menu__subcontainer'),
  );

  subcontainers.forEach((subcontainer) => {
    const subpopover = subcontainer.querySelector('[popover]');

    [
      'pointerover', // Event to show the subpopover when the mouse moves over
      'focusin', // Event to make the subpopover keyboard-accessible
    ].forEach((eventName) => {
      subcontainer.addEventListener(eventName, (event) => {
        subcontainer.classList.add('menu__subcontainer--active');
        event.stopPropagation();
        subpopover.showPopover();
      });
    });

    // Event to hide the subpopover when the mouse moves out
    subcontainer.addEventListener('pointerleave', (event) => {
      subcontainer.classList.remove('menu__subcontainer--active');
      subpopover.hidePopover();
    });

    // Event to hide the subpopover with keyboard-accessible
    subcontainer.addEventListener('focusout', (event) => {
      if (!subcontainer.contains(event.relatedTarget)) {
        // event.relatedTarget contains the active element
        subcontainer.classList.remove('menu__subcontainer--active');
        subpopover.hidePopover();
      }
    });
  });

  // Events to hide the popover menus when an option is selected in either of them
  mainpopover.addEventListener('pointerdown', () => {
    subcontainers.forEach((subcontainer) => {
      const subpopover = subcontainer.querySelector('[popover]');
      subcontainer.classList.remove('menu__subcontainer--active');
      subpopover.hidePopover();
    });

    mainpopover.hidePopover();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', async () => {
    await setup();
  });
} else {
  await setup();
}
