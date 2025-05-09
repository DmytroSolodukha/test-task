import fs from 'fs';
import path from 'path';
import { User } from '@/types';

const dbPath = path.join(process.cwd(), 'db.json');

interface Database {
  users: User[];
}

export function readDB(): Database {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
}

export function writeDB(data: Database) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export function getUser(id: string): User | undefined {
  const db = readDB();
  return db.users.find(user => user.id === id);
}

export function updateUser(id: string, updates: Partial<User>): User | undefined {
  const db = readDB();
  const userIndex = db.users.findIndex(user => user.id === id);
  
  if (userIndex === -1) return undefined;
  
  db.users[userIndex] = { ...db.users[userIndex], ...updates };
  writeDB(db);
  
  return db.users[userIndex];
}

export function updateUserOnboarding(id: string, step: string, completed: boolean): User | undefined {
  const db = readDB();
  const userIndex = db.users.findIndex(user => user.id === id);
  
  if (userIndex === -1) return undefined;
  
  db.users[userIndex] = {
    ...db.users[userIndex],
    onboarding: {
      ...db.users[userIndex].onboarding,
      [step]: completed
    }
  };
  
  writeDB(db);
  return db.users[userIndex];
} 