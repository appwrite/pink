import type { ComponentType } from 'svelte';
import { IconCalendar, IconFingerPrint, IconText } from '@appwrite.io/pink-icons-svelte';

export type RowData = {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    email: string;
    phone: string;
    address: string;
    billingAddress: string;
};

export type StoryColumn = {
    id: string;
    width?: number | { min: number; max?: number };
    draggable?: boolean;
    resizable?: boolean;
    fixed?: boolean;
    isAction?: boolean;
    hide?: boolean;
    meta?: { label?: string; icon?: ComponentType; isPrimary?: boolean };
};

export const baseColumnsInternal: StoryColumn[] = [
    {
        id: 'id',
        width: { min: 225 },
        resizable: false,
        meta: { label: 'ID', icon: IconFingerPrint, isPrimary: true }
    },
    {
        id: 'name',
        width: { min: 150 },
        draggable: true,
        resizable: true,
        meta: { label: 'Name', icon: IconText }
    },
    {
        id: 'dateOfBirth',
        width: { min: 200 },
        draggable: true,
        resizable: true,
        meta: { label: 'Date of Birth', icon: IconCalendar }
    },
    {
        id: 'gender',
        width: { min: 200 },
        draggable: true,
        resizable: true,
        meta: { label: 'Gender', icon: IconText }
    },
    {
        id: 'email',
        width: { min: 225 },
        draggable: true,
        resizable: true,
        meta: { label: 'Email Address', icon: IconText }
    },
    {
        id: 'phone',
        width: { min: 150 },
        draggable: true,
        resizable: true,
        meta: { label: 'Phone Number', icon: IconText }
    },
    {
        id: 'address',
        width: { min: 250 },
        draggable: true,
        resizable: true,
        meta: { label: 'Shipping Address', icon: IconText }
    },
    {
        id: 'billingAddress',
        width: { min: 250 },
        draggable: true,
        resizable: true,
        meta: { label: 'Billing Address', icon: IconText }
    },
    {
        id: 'actions',
        width: 40,
        fixed: true,
        resizable: false,
        draggable: false,
        isAction: true
    }
];

export const baseDataInternal: RowData[] = [
    {
        id: '65e89...9249db8df',
        name: 'John Smith',
        dateOfBirth: 'Jan 25, 1990',
        gender: 'Male',
        email: 'john.smith@example.com',
        phone: '+4065550120',
        address: '146 Main St, CityA, StateA',
        billingAddress: '146 Main St, CityA, StateA'
    },
    {
        id: '65e89...9249df53',
        name: 'Emily Johnson',
        dateOfBirth: 'Feb 4, 1962',
        gender: 'Female',
        email: 'emily.johnson@example.com',
        phone: '+4805550103',
        address: '478 Elm St, CityB, StateB',
        billingAddress: '478 Elm St, CityB, StateB'
    },
    {
        id: '65e89...9249dhf52',
        name: 'Michael Brown',
        dateOfBirth: 'Mar 23, 1984',
        gender: 'Male',
        email: 'michaelbrown@example.com',
        phone: '+6035550123',
        address: '388 Oak St, CityC, StateC',
        billingAddress: '388 Oak St, CityC, StateC'
    },
    {
        id: '65e90...9249abe12',
        name: 'Priya Mehra',
        dateOfBirth: 'Dec 10, 1995',
        gender: 'Female',
        email: 'priya.mehra@example.com',
        phone: '+919811112233',
        address: '77 Lotus Apt, Delhi, India',
        billingAddress: '77 Lotus Apt, Delhi, India'
    },
    {
        id: '65e91...9249dcf85',
        name: 'David Lin',
        dateOfBirth: 'Jul 8, 1989',
        gender: 'Male',
        email: 'david.lin@example.com',
        phone: '+14075550666',
        address: '230 Willow St, San Francisco, CA',
        billingAddress: '230 Willow St, San Francisco, CA'
    },
    {
        id: '65e92...9249ee412',
        name: 'Sara Ali',
        dateOfBirth: 'Sep 12, 1992',
        gender: 'Female',
        email: 'sara.ali@example.com',
        phone: '+447911123456',
        address: '12 Kings Road, London, UK',
        billingAddress: '12 Kings Road, London, UK'
    },
    {
        id: '65e93...9249d4e16',
        name: 'Carlos Gómez',
        dateOfBirth: 'May 15, 1987',
        gender: 'Male',
        email: 'carlos.gomez@example.com',
        phone: '+34123456789',
        address: 'Calle Mayor 1, Madrid, Spain',
        billingAddress: 'Calle Mayor 1, Madrid, Spain'
    },
    {
        id: '65e94...9249aa120',
        name: 'Amelia Brown',
        dateOfBirth: 'Nov 23, 1996',
        gender: 'Female',
        email: 'amelia.brown@example.com',
        phone: '+61234567890',
        address: '56 George St, Sydney, Australia',
        billingAddress: '56 George St, Sydney, Australia'
    },
    {
        id: '65e95...9249cbf21',
        name: 'Kenji Watanabe',
        dateOfBirth: 'Aug 2, 1983',
        gender: 'Male',
        email: 'kenji.watanabe@example.com',
        phone: '+81312345678',
        address: '9-3-1 Akasaka, Tokyo, Japan',
        billingAddress: '9-3-1 Akasaka, Tokyo, Japan'
    },
    {
        id: '65e96...9249ff0ab',
        name: 'Fatima Noor',
        dateOfBirth: 'Apr 18, 1994',
        gender: 'Female',
        email: 'fatima.noor@example.com',
        phone: '+971501234567',
        address: '23 Al Fahidi St, Dubai, UAE',
        billingAddress: '23 Al Fahidi St, Dubai, UAE'
    }
];

export const FAKE_ROW: RowData = {
    id: Math.random().toString(36).substring(2, 9),
    name: 'John Doe',
    dateOfBirth: 'Jan 1, 1990',
    gender: 'Male',
    email: 'johndoe@example.com',
    phone: '+911234567890',
    address: '123 Main St, City, State',
    billingAddress: '123 Main St, City, State'
};

export function getCellValue(row: RowData, columnId: string): string {
    return columnId in row ? (row[columnId as keyof RowData] ?? 'null') : 'null';
}

export function setCellValue(value: string, row: RowData, columnId: string) {
    if (columnId in row) row[columnId as keyof RowData] = value;
}

export type RandomRowData = Record<string, string>;

export function generateRandomString(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export function generateRandomColumns(count: number): StoryColumn[] {
    const columns: StoryColumn[] = [];

    for (let i = 0; i < count; i++) {
        const columnId = `col_${i}`;
        const columnName = `Column ${i + 1}`;

        columns.push({
            id: columnId,
            width: { min: 150 },
            draggable: true,
            resizable: true,
            hide: i === count - 1,
            meta: {
                label: columnName,
                icon: IconText,
                isPrimary: i === 0
            }
        });
    }

    // Add action column at the end
    columns.push({
        id: 'actions',
        width: 40,
        fixed: true,
        resizable: false,
        draggable: false,
        isAction: true
    });

    return columns;
}

export function generateRandomRows(rowCount: number, columns: StoryColumn[]): RandomRowData[] {
    const rows: RandomRowData[] = [];

    for (let i = 0; i < rowCount; i++) {
        const row: RandomRowData = {};

        columns.forEach((col) => {
            if (!col.isAction) {
                if (col.meta?.isPrimary) {
                    row[col.id] = `${generateRandomString(5)}...${generateRandomString(8)}`;
                } else {
                    row[col.id] = generateRandomString(Math.floor(Math.random() * 20) + 5);
                }
            }
        });

        rows.push(row);
    }

    return rows;
}

export function getRandomCellValue(row: RandomRowData, columnId: string): string {
    return columnId in row ? (row[columnId] ?? 'null') : 'null';
}

export function setRandomCellValue(value: string, row: RandomRowData, columnId: string) {
    row[columnId] = value;
}
