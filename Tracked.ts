import { TrackedObject } from "./TrackedObject";
import { TrackedValue } from "./TrackedValue";
import { Trackable, TrackableDiff } from "./types";

export class Tracked<T> implements Trackable<T> {
  private _tracked: Trackable<T>;

  /**
   * Creates an instance of Tracked. 
   * 
   * @param value The initial value to be tracked. This can be either a single value of type T or an object with properties of type T.
   */
  constructor(value: T | Record<keyof T, T[keyof T]>) {
    if (value instanceof Object) {
      this._tracked = new TrackedObject(value as Record<keyof T, T[keyof T]>);
    } else {
      this._tracked = new TrackedValue(value as T);
    }
  }

  /// Value cleanliness
  public get pristine(): boolean {
    return this._tracked.pristine;
  }

  public get dirty(): boolean {
    return this._tracked.dirty;
  }

  /// Value accessors
  public set value(value: T) {
    this._tracked.value = value;
  }

  public get value(): T {
    return this._tracked.value;
  }

  /// State Management
  public commit(): void {
    this._tracked.commit();
  }

  public revert(): void {
    this._tracked.revert();
  }

  public diff(): TrackableDiff<T> | undefined{
    return this._tracked.diff();
  }
}