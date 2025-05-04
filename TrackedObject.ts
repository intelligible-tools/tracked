import { Trackable, TrackableDiff, TrackableObject, TrackableObjectDiff } from "./types";

export class TrackedObject<T extends Record<keyof T, T[keyof T]>> implements TrackableObject<T> {
  private _value: Record<keyof T, Trackable<T[keyof T]>>;
  private _pristine: boolean;

  constructor(object: Record<keyof T, T[keyof T]>) {}

  public get pristine(): boolean {
    return this._pristine;
  }

  public get dirty(): boolean {
    return !this.pristine;
  }

  public set value(value: Partial<T>) {
    Object.entries(value).forEach(([entryKey, entryValue]) => {
      this._value[entryKey].value = entryValue;
    });

    this._pristine = false;
  }

  public get value(): T {
    const value = Object.entries(this._value).reduce((acc, [key]) => {
      acc[key] = this._value[key].value;
      return acc;
    }, {} as T);

    return Object.freeze(value);
  }

  public commit(): void {
    Object.entries(this._value).forEach(([entryKey]) => {
      this._value[entryKey].commit();
    });

    this._pristine = true;
  }

  public revert(): void {
    Object.entries(this._value).forEach(([entryKey]) => {
      this._value[entryKey].revert();
    });

    this._pristine = true;
  }

  public diff(): TrackableDiff<T> | undefined {
    const diff: TrackableObjectDiff<T> = Object.entries(this._value).reduce((acc, [key]) => {
      if (this._value[key].dirty) {
        acc[key] = this._value[key].diff();
      }
      return acc;
    }, {} as TrackableObjectDiff<T>);

    if (Object.keys(diff).length === 0) {
      return undefined;
    }

    return Object.freeze(diff) as TrackableDiff<T>;
  }
}
