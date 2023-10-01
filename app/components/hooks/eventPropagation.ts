export function useStopEventPropagation() {
  return (event, prevent: boolean = true) => {
    if (event) {
      if (event.stopImmediatePropagation) {
        event.stopImmediatePropagation();
      }

      event.stopPropagation();

      if (prevent) {
        event.preventDefault();
      }
    }

    return false;
  };
}
