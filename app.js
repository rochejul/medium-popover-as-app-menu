async function setup() {
  const mainpopover = document.querySelector('.menu__mainpopover');
  const subcontainers = Array.from(
    document.querySelectorAll('.menu__subcontainer'),
  );

  subcontainers.forEach((subcontainer) => {
    const subpopover = subcontainer.querySelector('[popover]');

    // Event to show the subpopover when the mouse moves over
    subcontainer.addEventListener('pointerover', (event) => {
      event.stopPropagation();
      subpopover.showPopover();
    });

    // Event to hide the subpopover when the mouse moves out
    subcontainer.addEventListener('pointerleave', (event) => {
      subpopover.hidePopover();
    });
  });

  // Events to hide the popover menus when an option is selected in either of them
  mainpopover.addEventListener('pointerdown', () => {
    subcontainers.forEach((subcontainer) => {
      const subpopover = subcontainer.querySelector('[popover]');
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
