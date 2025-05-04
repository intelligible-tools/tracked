import { Trackable } from './Trackable';

export abstract class TrackableObject<T extends Record<keyof T, T[keyof T]>> extends Trackable<T> {}