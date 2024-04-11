// exclude certain types
type eventType = 'click' | 'scroll' | 'mousemove'       // either of these 3

type ExcludeEvent = Exclude<eventType, 'click'>;           // type ExcludeEvent = "scroll" | "mousemove"

const handleEvent = (event: ExcludeEvent) => {
    console.log(`Handling event: ${event}`);
};

// handleEvent('click');       // '"click"' is not assignable
handleEvent('scroll');     // ok  