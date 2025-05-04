import { TrackableValueDiff } from "./TrackableValueDiff";

export type TrackableObjectDiff<T> = T extends Record<keyof T, T[keyof T]> ? Partial<T> : TrackableValueDiff<T>;