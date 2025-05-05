import { TrackableDiff, Trackable, TrackableValueDiff } from "./types";

/**
 * The TrackedValue class implements the Trackable abstract class, allowing for tracking changes to a single value.
 * It provides methods to get the current value, set a new value, check if the field is pristine or dirty,
 * and commit or revert changes.
 *
 * @class TrackedValue
 * @template T - The type of the value being tracked.
 * @implements {Trackable<T>} - Implements the {@linkcode Trackable} interface.
 */
export class TrackedValue<T> implements Trackable<T> {
  /// Value tracking
  private _previousValue: T;
  private _currentValue: T;

  /// Constructor
  /**
   * Creates an instance of TrackedValue.
   *
   * @param {T} value - The initial value to be tracked.
   */
  constructor(value: T) {
    this._previousValue = value; //?
    this._currentValue = value; //?
  }

  /// Value clenliness
  /**
   * The pristine state of the field. If the previous value and current value are equal, it is considered pristine.
   *
   * @returns {boolean} - True if the field is pristine, false otherwise.
   */
  public get pristine(): boolean {
    return this._previousValue === this._currentValue;
  }

  /**
   * The dirty state of the field. If the previous value and current value are not equal, it is considered dirty.
   *
   * @returns {boolean} - True if the field is dirty, false otherwise.
   */
  public get dirty(): boolean {
    return !this.pristine;
  }

  /// Value accessors
  /**
   * Sets the value of the field. This will also update the previous value to the current value.
   *
   * @param {T} value - The new value to set.
   */
  public set value(value: T) {
    this._previousValue = this._currentValue;
    this._currentValue = value;
  }

  /**
   * Gets the current value of the field.
   *
   * @returns {T} - The current value of the field.
   */
  public get value(): T {
    return this._currentValue; //?
  }

  /// State Management
  /**
   * Commits the current value of the field, making it the previous value.
   * The object will be considered pristine and not dirty after this operation.
   *
   * @returns {void}
   */
  public commit(): void {
    this._previousValue = this._currentValue;
  }

  /**
   * Reverts the current value of the field to the previous value.
   * The object will be considered pristine and not dirty after this operation.
   *
   * @returns {void}
   */
  public revert(): void {
    this._currentValue = this._previousValue;
  }

  public diff(): TrackableDiff<T> | undefined {
    if (this.dirty) {
      const diff: TrackableValueDiff<T> = {
        previous: this._previousValue,
        current: this._currentValue
      };

      return Object.freeze(diff) as TrackableDiff<T>;
    }

    return undefined;
  }
}