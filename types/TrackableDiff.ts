import { TrackableObjectDiff } from "./TrackableObjectDiff";
import { TrackableValueDiff } from "./TrackableValueDiff";

export type TrackableDiff<T> = T extends Record<keyof T, T[keyof T]> ? Readonly<Partial<TrackableObjectDiff<T>>> : Readonly<TrackableValueDiff<T>>;