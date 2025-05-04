import { TrackableDiff } from "./TrackableDiff";

export abstract class Trackable<T> {
    abstract pristine: boolean;
    abstract dirty: boolean;

    abstract get value(): T;
    abstract set value(value: T);

    abstract commit(): void;
    abstract revert(): void;
    abstract diff(): TrackableDiff<T> | undefined;
}