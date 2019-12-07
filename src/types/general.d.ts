// Helper types for OmitType
type FlagExcludedType<B, U> = {
  [Key in keyof B]: B[Key] extends U ? never : Key;
};
type AllowedNames<B, U> = FlagExcludedType<B, U>[keyof B];

declare global {
  type Maybe<T> = T | null | undefined;

  // helper type for nullable values that's more strict than `Maybe`.
  // use this in scenarios where you'd like to rely on explict null checks.
  // (you might does this to avoid boolean casting, which yields a performance
  // benefit in critical situations).
  type Nullable<T> = T | null;

  type ImmutableRecord<K extends string, V> = Readonly<Record<K, V>>;

  type OmitType<B, U> = Pick<B, AllowedNames<B, U>>;
}

export {};
