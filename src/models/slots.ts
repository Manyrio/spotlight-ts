


interface Slot {
    time: string;     // Time in "HH:MM" format
    available: boolean;
}

interface ReservationDay {
    date: string;     // ISO date string format (e.g., "2023-04-01T00:00:00+02:00")
    day: string;      // Day of the week (e.g., "Saturday")
    reservations: boolean;
    slots: Slot[];    // Array of Slot objects
}

interface ReservationMap {
    [key: string]: ReservationDay;  // Dynamic key like "1", "2", etc.
}


