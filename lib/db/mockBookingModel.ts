import { randomUUID } from 'crypto';

type MockBooking = {
  _id?: string;
  tourSlug: string;
  tourTitle: string;
  name: string;
  phone: string;
  email?: string;
  people: number;
  message?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const seed: MockBooking[] = [];

function clone<T>(value: T) {
  return JSON.parse(JSON.stringify(value)) as T;
}

export const mockBookingModel = {
  async find() {
    return clone(
      [...seed].sort(
        (left, right) =>
          new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
      )
    );
  },

  async create(data: Omit<MockBooking, '_id' | 'createdAt' | 'updatedAt' | 'status'> & {
    status?: string;
  }) {
    const now = new Date().toISOString();
    const doc: MockBooking = {
      _id: randomUUID(),
      status: data.status ?? 'pending',
      createdAt: now,
      updatedAt: now,
      ...data,
    };

    seed.push(doc);
    return clone(doc);
  },
};
