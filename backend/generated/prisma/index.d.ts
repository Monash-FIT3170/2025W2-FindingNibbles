
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserLocation
 * 
 */
export type UserLocation = $Result.DefaultSelection<Prisma.$UserLocationPayload>
/**
 * Model DietaryRestriction
 * 
 */
export type DietaryRestriction = $Result.DefaultSelection<Prisma.$DietaryRestrictionPayload>
/**
 * Model UserDietary
 * 
 */
export type UserDietary = $Result.DefaultSelection<Prisma.$UserDietaryPayload>
/**
 * Model Restaurant
 * 
 */
export type Restaurant = $Result.DefaultSelection<Prisma.$RestaurantPayload>
/**
 * Model RestaurantReview
 * 
 */
export type RestaurantReview = $Result.DefaultSelection<Prisma.$RestaurantReviewPayload>
/**
 * Model Cuisine
 * 
 */
export type Cuisine = $Result.DefaultSelection<Prisma.$CuisinePayload>
/**
 * Model RestaurantCuisine
 * 
 */
export type RestaurantCuisine = $Result.DefaultSelection<Prisma.$RestaurantCuisinePayload>
/**
 * Model Dish
 * 
 */
export type Dish = $Result.DefaultSelection<Prisma.$DishPayload>
/**
 * Model DishDietary
 * 
 */
export type DishDietary = $Result.DefaultSelection<Prisma.$DishDietaryPayload>
/**
 * Model UserMealPlan
 * 
 */
export type UserMealPlan = $Result.DefaultSelection<Prisma.$UserMealPlanPayload>
/**
 * Model MealPlanDish
 * 
 */
export type MealPlanDish = $Result.DefaultSelection<Prisma.$MealPlanDishPayload>
/**
 * Model UserCalorieLog
 * 
 */
export type UserCalorieLog = $Result.DefaultSelection<Prisma.$UserCalorieLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userLocation`: Exposes CRUD operations for the **UserLocation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserLocations
    * const userLocations = await prisma.userLocation.findMany()
    * ```
    */
  get userLocation(): Prisma.UserLocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dietaryRestriction`: Exposes CRUD operations for the **DietaryRestriction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DietaryRestrictions
    * const dietaryRestrictions = await prisma.dietaryRestriction.findMany()
    * ```
    */
  get dietaryRestriction(): Prisma.DietaryRestrictionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userDietary`: Exposes CRUD operations for the **UserDietary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserDietaries
    * const userDietaries = await prisma.userDietary.findMany()
    * ```
    */
  get userDietary(): Prisma.UserDietaryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.restaurant`: Exposes CRUD operations for the **Restaurant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Restaurants
    * const restaurants = await prisma.restaurant.findMany()
    * ```
    */
  get restaurant(): Prisma.RestaurantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.restaurantReview`: Exposes CRUD operations for the **RestaurantReview** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RestaurantReviews
    * const restaurantReviews = await prisma.restaurantReview.findMany()
    * ```
    */
  get restaurantReview(): Prisma.RestaurantReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cuisine`: Exposes CRUD operations for the **Cuisine** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cuisines
    * const cuisines = await prisma.cuisine.findMany()
    * ```
    */
  get cuisine(): Prisma.CuisineDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.restaurantCuisine`: Exposes CRUD operations for the **RestaurantCuisine** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RestaurantCuisines
    * const restaurantCuisines = await prisma.restaurantCuisine.findMany()
    * ```
    */
  get restaurantCuisine(): Prisma.RestaurantCuisineDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dish`: Exposes CRUD operations for the **Dish** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dishes
    * const dishes = await prisma.dish.findMany()
    * ```
    */
  get dish(): Prisma.DishDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dishDietary`: Exposes CRUD operations for the **DishDietary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DishDietaries
    * const dishDietaries = await prisma.dishDietary.findMany()
    * ```
    */
  get dishDietary(): Prisma.DishDietaryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userMealPlan`: Exposes CRUD operations for the **UserMealPlan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserMealPlans
    * const userMealPlans = await prisma.userMealPlan.findMany()
    * ```
    */
  get userMealPlan(): Prisma.UserMealPlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mealPlanDish`: Exposes CRUD operations for the **MealPlanDish** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MealPlanDishes
    * const mealPlanDishes = await prisma.mealPlanDish.findMany()
    * ```
    */
  get mealPlanDish(): Prisma.MealPlanDishDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userCalorieLog`: Exposes CRUD operations for the **UserCalorieLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserCalorieLogs
    * const userCalorieLogs = await prisma.userCalorieLog.findMany()
    * ```
    */
  get userCalorieLog(): Prisma.UserCalorieLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    UserLocation: 'UserLocation',
    DietaryRestriction: 'DietaryRestriction',
    UserDietary: 'UserDietary',
    Restaurant: 'Restaurant',
    RestaurantReview: 'RestaurantReview',
    Cuisine: 'Cuisine',
    RestaurantCuisine: 'RestaurantCuisine',
    Dish: 'Dish',
    DishDietary: 'DishDietary',
    UserMealPlan: 'UserMealPlan',
    MealPlanDish: 'MealPlanDish',
    UserCalorieLog: 'UserCalorieLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "userLocation" | "dietaryRestriction" | "userDietary" | "restaurant" | "restaurantReview" | "cuisine" | "restaurantCuisine" | "dish" | "dishDietary" | "userMealPlan" | "mealPlanDish" | "userCalorieLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserLocation: {
        payload: Prisma.$UserLocationPayload<ExtArgs>
        fields: Prisma.UserLocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserLocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserLocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLocationPayload>
          }
          findFirst: {
            args: Prisma.UserLocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserLocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLocationPayload>
          }
          findMany: {
            args: Prisma.UserLocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLocationPayload>[]
          }
          create: {
            args: Prisma.UserLocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLocationPayload>
          }
          createMany: {
            args: Prisma.UserLocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserLocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLocationPayload>[]
          }
          delete: {
            args: Prisma.UserLocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLocationPayload>
          }
          update: {
            args: Prisma.UserLocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLocationPayload>
          }
          deleteMany: {
            args: Prisma.UserLocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserLocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserLocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLocationPayload>[]
          }
          upsert: {
            args: Prisma.UserLocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserLocationPayload>
          }
          aggregate: {
            args: Prisma.UserLocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserLocation>
          }
          groupBy: {
            args: Prisma.UserLocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserLocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserLocationCountArgs<ExtArgs>
            result: $Utils.Optional<UserLocationCountAggregateOutputType> | number
          }
        }
      }
      DietaryRestriction: {
        payload: Prisma.$DietaryRestrictionPayload<ExtArgs>
        fields: Prisma.DietaryRestrictionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DietaryRestrictionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DietaryRestrictionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload>
          }
          findFirst: {
            args: Prisma.DietaryRestrictionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DietaryRestrictionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload>
          }
          findMany: {
            args: Prisma.DietaryRestrictionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload>[]
          }
          create: {
            args: Prisma.DietaryRestrictionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload>
          }
          createMany: {
            args: Prisma.DietaryRestrictionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DietaryRestrictionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload>[]
          }
          delete: {
            args: Prisma.DietaryRestrictionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload>
          }
          update: {
            args: Prisma.DietaryRestrictionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload>
          }
          deleteMany: {
            args: Prisma.DietaryRestrictionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DietaryRestrictionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DietaryRestrictionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload>[]
          }
          upsert: {
            args: Prisma.DietaryRestrictionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DietaryRestrictionPayload>
          }
          aggregate: {
            args: Prisma.DietaryRestrictionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDietaryRestriction>
          }
          groupBy: {
            args: Prisma.DietaryRestrictionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DietaryRestrictionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DietaryRestrictionCountArgs<ExtArgs>
            result: $Utils.Optional<DietaryRestrictionCountAggregateOutputType> | number
          }
        }
      }
      UserDietary: {
        payload: Prisma.$UserDietaryPayload<ExtArgs>
        fields: Prisma.UserDietaryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserDietaryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDietaryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserDietaryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDietaryPayload>
          }
          findFirst: {
            args: Prisma.UserDietaryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDietaryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserDietaryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDietaryPayload>
          }
          findMany: {
            args: Prisma.UserDietaryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDietaryPayload>[]
          }
          create: {
            args: Prisma.UserDietaryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDietaryPayload>
          }
          createMany: {
            args: Prisma.UserDietaryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserDietaryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDietaryPayload>[]
          }
          delete: {
            args: Prisma.UserDietaryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDietaryPayload>
          }
          update: {
            args: Prisma.UserDietaryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDietaryPayload>
          }
          deleteMany: {
            args: Prisma.UserDietaryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserDietaryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserDietaryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDietaryPayload>[]
          }
          upsert: {
            args: Prisma.UserDietaryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDietaryPayload>
          }
          aggregate: {
            args: Prisma.UserDietaryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserDietary>
          }
          groupBy: {
            args: Prisma.UserDietaryGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserDietaryGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserDietaryCountArgs<ExtArgs>
            result: $Utils.Optional<UserDietaryCountAggregateOutputType> | number
          }
        }
      }
      Restaurant: {
        payload: Prisma.$RestaurantPayload<ExtArgs>
        fields: Prisma.RestaurantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RestaurantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RestaurantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload>
          }
          findFirst: {
            args: Prisma.RestaurantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RestaurantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload>
          }
          findMany: {
            args: Prisma.RestaurantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload>[]
          }
          create: {
            args: Prisma.RestaurantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload>
          }
          createMany: {
            args: Prisma.RestaurantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RestaurantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload>[]
          }
          delete: {
            args: Prisma.RestaurantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload>
          }
          update: {
            args: Prisma.RestaurantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload>
          }
          deleteMany: {
            args: Prisma.RestaurantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RestaurantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RestaurantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload>[]
          }
          upsert: {
            args: Prisma.RestaurantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantPayload>
          }
          aggregate: {
            args: Prisma.RestaurantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRestaurant>
          }
          groupBy: {
            args: Prisma.RestaurantGroupByArgs<ExtArgs>
            result: $Utils.Optional<RestaurantGroupByOutputType>[]
          }
          count: {
            args: Prisma.RestaurantCountArgs<ExtArgs>
            result: $Utils.Optional<RestaurantCountAggregateOutputType> | number
          }
        }
      }
      RestaurantReview: {
        payload: Prisma.$RestaurantReviewPayload<ExtArgs>
        fields: Prisma.RestaurantReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RestaurantReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RestaurantReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantReviewPayload>
          }
          findFirst: {
            args: Prisma.RestaurantReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RestaurantReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantReviewPayload>
          }
          findMany: {
            args: Prisma.RestaurantReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantReviewPayload>[]
          }
          create: {
            args: Prisma.RestaurantReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantReviewPayload>
          }
          createMany: {
            args: Prisma.RestaurantReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RestaurantReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantReviewPayload>[]
          }
          delete: {
            args: Prisma.RestaurantReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantReviewPayload>
          }
          update: {
            args: Prisma.RestaurantReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantReviewPayload>
          }
          deleteMany: {
            args: Prisma.RestaurantReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RestaurantReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RestaurantReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantReviewPayload>[]
          }
          upsert: {
            args: Prisma.RestaurantReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantReviewPayload>
          }
          aggregate: {
            args: Prisma.RestaurantReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRestaurantReview>
          }
          groupBy: {
            args: Prisma.RestaurantReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<RestaurantReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.RestaurantReviewCountArgs<ExtArgs>
            result: $Utils.Optional<RestaurantReviewCountAggregateOutputType> | number
          }
        }
      }
      Cuisine: {
        payload: Prisma.$CuisinePayload<ExtArgs>
        fields: Prisma.CuisineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CuisineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuisinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CuisineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuisinePayload>
          }
          findFirst: {
            args: Prisma.CuisineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuisinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CuisineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuisinePayload>
          }
          findMany: {
            args: Prisma.CuisineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuisinePayload>[]
          }
          create: {
            args: Prisma.CuisineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuisinePayload>
          }
          createMany: {
            args: Prisma.CuisineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CuisineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuisinePayload>[]
          }
          delete: {
            args: Prisma.CuisineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuisinePayload>
          }
          update: {
            args: Prisma.CuisineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuisinePayload>
          }
          deleteMany: {
            args: Prisma.CuisineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CuisineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CuisineUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuisinePayload>[]
          }
          upsert: {
            args: Prisma.CuisineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CuisinePayload>
          }
          aggregate: {
            args: Prisma.CuisineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCuisine>
          }
          groupBy: {
            args: Prisma.CuisineGroupByArgs<ExtArgs>
            result: $Utils.Optional<CuisineGroupByOutputType>[]
          }
          count: {
            args: Prisma.CuisineCountArgs<ExtArgs>
            result: $Utils.Optional<CuisineCountAggregateOutputType> | number
          }
        }
      }
      RestaurantCuisine: {
        payload: Prisma.$RestaurantCuisinePayload<ExtArgs>
        fields: Prisma.RestaurantCuisineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RestaurantCuisineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantCuisinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RestaurantCuisineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantCuisinePayload>
          }
          findFirst: {
            args: Prisma.RestaurantCuisineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantCuisinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RestaurantCuisineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantCuisinePayload>
          }
          findMany: {
            args: Prisma.RestaurantCuisineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantCuisinePayload>[]
          }
          create: {
            args: Prisma.RestaurantCuisineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantCuisinePayload>
          }
          createMany: {
            args: Prisma.RestaurantCuisineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RestaurantCuisineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantCuisinePayload>[]
          }
          delete: {
            args: Prisma.RestaurantCuisineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantCuisinePayload>
          }
          update: {
            args: Prisma.RestaurantCuisineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantCuisinePayload>
          }
          deleteMany: {
            args: Prisma.RestaurantCuisineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RestaurantCuisineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RestaurantCuisineUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantCuisinePayload>[]
          }
          upsert: {
            args: Prisma.RestaurantCuisineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RestaurantCuisinePayload>
          }
          aggregate: {
            args: Prisma.RestaurantCuisineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRestaurantCuisine>
          }
          groupBy: {
            args: Prisma.RestaurantCuisineGroupByArgs<ExtArgs>
            result: $Utils.Optional<RestaurantCuisineGroupByOutputType>[]
          }
          count: {
            args: Prisma.RestaurantCuisineCountArgs<ExtArgs>
            result: $Utils.Optional<RestaurantCuisineCountAggregateOutputType> | number
          }
        }
      }
      Dish: {
        payload: Prisma.$DishPayload<ExtArgs>
        fields: Prisma.DishFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DishFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DishFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishPayload>
          }
          findFirst: {
            args: Prisma.DishFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DishFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishPayload>
          }
          findMany: {
            args: Prisma.DishFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishPayload>[]
          }
          create: {
            args: Prisma.DishCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishPayload>
          }
          createMany: {
            args: Prisma.DishCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DishCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishPayload>[]
          }
          delete: {
            args: Prisma.DishDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishPayload>
          }
          update: {
            args: Prisma.DishUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishPayload>
          }
          deleteMany: {
            args: Prisma.DishDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DishUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DishUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishPayload>[]
          }
          upsert: {
            args: Prisma.DishUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishPayload>
          }
          aggregate: {
            args: Prisma.DishAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDish>
          }
          groupBy: {
            args: Prisma.DishGroupByArgs<ExtArgs>
            result: $Utils.Optional<DishGroupByOutputType>[]
          }
          count: {
            args: Prisma.DishCountArgs<ExtArgs>
            result: $Utils.Optional<DishCountAggregateOutputType> | number
          }
        }
      }
      DishDietary: {
        payload: Prisma.$DishDietaryPayload<ExtArgs>
        fields: Prisma.DishDietaryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DishDietaryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishDietaryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DishDietaryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishDietaryPayload>
          }
          findFirst: {
            args: Prisma.DishDietaryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishDietaryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DishDietaryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishDietaryPayload>
          }
          findMany: {
            args: Prisma.DishDietaryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishDietaryPayload>[]
          }
          create: {
            args: Prisma.DishDietaryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishDietaryPayload>
          }
          createMany: {
            args: Prisma.DishDietaryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DishDietaryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishDietaryPayload>[]
          }
          delete: {
            args: Prisma.DishDietaryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishDietaryPayload>
          }
          update: {
            args: Prisma.DishDietaryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishDietaryPayload>
          }
          deleteMany: {
            args: Prisma.DishDietaryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DishDietaryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DishDietaryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishDietaryPayload>[]
          }
          upsert: {
            args: Prisma.DishDietaryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DishDietaryPayload>
          }
          aggregate: {
            args: Prisma.DishDietaryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDishDietary>
          }
          groupBy: {
            args: Prisma.DishDietaryGroupByArgs<ExtArgs>
            result: $Utils.Optional<DishDietaryGroupByOutputType>[]
          }
          count: {
            args: Prisma.DishDietaryCountArgs<ExtArgs>
            result: $Utils.Optional<DishDietaryCountAggregateOutputType> | number
          }
        }
      }
      UserMealPlan: {
        payload: Prisma.$UserMealPlanPayload<ExtArgs>
        fields: Prisma.UserMealPlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserMealPlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMealPlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserMealPlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMealPlanPayload>
          }
          findFirst: {
            args: Prisma.UserMealPlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMealPlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserMealPlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMealPlanPayload>
          }
          findMany: {
            args: Prisma.UserMealPlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMealPlanPayload>[]
          }
          create: {
            args: Prisma.UserMealPlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMealPlanPayload>
          }
          createMany: {
            args: Prisma.UserMealPlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserMealPlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMealPlanPayload>[]
          }
          delete: {
            args: Prisma.UserMealPlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMealPlanPayload>
          }
          update: {
            args: Prisma.UserMealPlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMealPlanPayload>
          }
          deleteMany: {
            args: Prisma.UserMealPlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserMealPlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserMealPlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMealPlanPayload>[]
          }
          upsert: {
            args: Prisma.UserMealPlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserMealPlanPayload>
          }
          aggregate: {
            args: Prisma.UserMealPlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserMealPlan>
          }
          groupBy: {
            args: Prisma.UserMealPlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserMealPlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserMealPlanCountArgs<ExtArgs>
            result: $Utils.Optional<UserMealPlanCountAggregateOutputType> | number
          }
        }
      }
      MealPlanDish: {
        payload: Prisma.$MealPlanDishPayload<ExtArgs>
        fields: Prisma.MealPlanDishFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MealPlanDishFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanDishPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MealPlanDishFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanDishPayload>
          }
          findFirst: {
            args: Prisma.MealPlanDishFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanDishPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MealPlanDishFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanDishPayload>
          }
          findMany: {
            args: Prisma.MealPlanDishFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanDishPayload>[]
          }
          create: {
            args: Prisma.MealPlanDishCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanDishPayload>
          }
          createMany: {
            args: Prisma.MealPlanDishCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MealPlanDishCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanDishPayload>[]
          }
          delete: {
            args: Prisma.MealPlanDishDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanDishPayload>
          }
          update: {
            args: Prisma.MealPlanDishUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanDishPayload>
          }
          deleteMany: {
            args: Prisma.MealPlanDishDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MealPlanDishUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MealPlanDishUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanDishPayload>[]
          }
          upsert: {
            args: Prisma.MealPlanDishUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MealPlanDishPayload>
          }
          aggregate: {
            args: Prisma.MealPlanDishAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMealPlanDish>
          }
          groupBy: {
            args: Prisma.MealPlanDishGroupByArgs<ExtArgs>
            result: $Utils.Optional<MealPlanDishGroupByOutputType>[]
          }
          count: {
            args: Prisma.MealPlanDishCountArgs<ExtArgs>
            result: $Utils.Optional<MealPlanDishCountAggregateOutputType> | number
          }
        }
      }
      UserCalorieLog: {
        payload: Prisma.$UserCalorieLogPayload<ExtArgs>
        fields: Prisma.UserCalorieLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserCalorieLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCalorieLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserCalorieLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCalorieLogPayload>
          }
          findFirst: {
            args: Prisma.UserCalorieLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCalorieLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserCalorieLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCalorieLogPayload>
          }
          findMany: {
            args: Prisma.UserCalorieLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCalorieLogPayload>[]
          }
          create: {
            args: Prisma.UserCalorieLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCalorieLogPayload>
          }
          createMany: {
            args: Prisma.UserCalorieLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCalorieLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCalorieLogPayload>[]
          }
          delete: {
            args: Prisma.UserCalorieLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCalorieLogPayload>
          }
          update: {
            args: Prisma.UserCalorieLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCalorieLogPayload>
          }
          deleteMany: {
            args: Prisma.UserCalorieLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserCalorieLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserCalorieLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCalorieLogPayload>[]
          }
          upsert: {
            args: Prisma.UserCalorieLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCalorieLogPayload>
          }
          aggregate: {
            args: Prisma.UserCalorieLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserCalorieLog>
          }
          groupBy: {
            args: Prisma.UserCalorieLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserCalorieLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCalorieLogCountArgs<ExtArgs>
            result: $Utils.Optional<UserCalorieLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    userLocation?: UserLocationOmit
    dietaryRestriction?: DietaryRestrictionOmit
    userDietary?: UserDietaryOmit
    restaurant?: RestaurantOmit
    restaurantReview?: RestaurantReviewOmit
    cuisine?: CuisineOmit
    restaurantCuisine?: RestaurantCuisineOmit
    dish?: DishOmit
    dishDietary?: DishDietaryOmit
    userMealPlan?: UserMealPlanOmit
    mealPlanDish?: MealPlanDishOmit
    userCalorieLog?: UserCalorieLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    locations: number
    userDietaries: number
    mealPlans: number
    calorieLogs: number
    restaurantReviews: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    locations?: boolean | UserCountOutputTypeCountLocationsArgs
    userDietaries?: boolean | UserCountOutputTypeCountUserDietariesArgs
    mealPlans?: boolean | UserCountOutputTypeCountMealPlansArgs
    calorieLogs?: boolean | UserCountOutputTypeCountCalorieLogsArgs
    restaurantReviews?: boolean | UserCountOutputTypeCountRestaurantReviewsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserLocationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUserDietariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDietaryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMealPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserMealPlanWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCalorieLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCalorieLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRestaurantReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RestaurantReviewWhereInput
  }


  /**
   * Count Type DietaryRestrictionCountOutputType
   */

  export type DietaryRestrictionCountOutputType = {
    userDietaries: number
    dishDietaries: number
  }

  export type DietaryRestrictionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userDietaries?: boolean | DietaryRestrictionCountOutputTypeCountUserDietariesArgs
    dishDietaries?: boolean | DietaryRestrictionCountOutputTypeCountDishDietariesArgs
  }

  // Custom InputTypes
  /**
   * DietaryRestrictionCountOutputType without action
   */
  export type DietaryRestrictionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestrictionCountOutputType
     */
    select?: DietaryRestrictionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DietaryRestrictionCountOutputType without action
   */
  export type DietaryRestrictionCountOutputTypeCountUserDietariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDietaryWhereInput
  }

  /**
   * DietaryRestrictionCountOutputType without action
   */
  export type DietaryRestrictionCountOutputTypeCountDishDietariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DishDietaryWhereInput
  }


  /**
   * Count Type RestaurantCountOutputType
   */

  export type RestaurantCountOutputType = {
    dishes: number
    restaurantCuisines: number
    restaurantReviews: number
  }

  export type RestaurantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dishes?: boolean | RestaurantCountOutputTypeCountDishesArgs
    restaurantCuisines?: boolean | RestaurantCountOutputTypeCountRestaurantCuisinesArgs
    restaurantReviews?: boolean | RestaurantCountOutputTypeCountRestaurantReviewsArgs
  }

  // Custom InputTypes
  /**
   * RestaurantCountOutputType without action
   */
  export type RestaurantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantCountOutputType
     */
    select?: RestaurantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RestaurantCountOutputType without action
   */
  export type RestaurantCountOutputTypeCountDishesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DishWhereInput
  }

  /**
   * RestaurantCountOutputType without action
   */
  export type RestaurantCountOutputTypeCountRestaurantCuisinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RestaurantCuisineWhereInput
  }

  /**
   * RestaurantCountOutputType without action
   */
  export type RestaurantCountOutputTypeCountRestaurantReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RestaurantReviewWhereInput
  }


  /**
   * Count Type CuisineCountOutputType
   */

  export type CuisineCountOutputType = {
    dishes: number
    restaurantCuisines: number
  }

  export type CuisineCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dishes?: boolean | CuisineCountOutputTypeCountDishesArgs
    restaurantCuisines?: boolean | CuisineCountOutputTypeCountRestaurantCuisinesArgs
  }

  // Custom InputTypes
  /**
   * CuisineCountOutputType without action
   */
  export type CuisineCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CuisineCountOutputType
     */
    select?: CuisineCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CuisineCountOutputType without action
   */
  export type CuisineCountOutputTypeCountDishesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DishWhereInput
  }

  /**
   * CuisineCountOutputType without action
   */
  export type CuisineCountOutputTypeCountRestaurantCuisinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RestaurantCuisineWhereInput
  }


  /**
   * Count Type DishCountOutputType
   */

  export type DishCountOutputType = {
    dishDietaries: number
    mealPlanDishes: number
  }

  export type DishCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dishDietaries?: boolean | DishCountOutputTypeCountDishDietariesArgs
    mealPlanDishes?: boolean | DishCountOutputTypeCountMealPlanDishesArgs
  }

  // Custom InputTypes
  /**
   * DishCountOutputType without action
   */
  export type DishCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DishCountOutputType
     */
    select?: DishCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DishCountOutputType without action
   */
  export type DishCountOutputTypeCountDishDietariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DishDietaryWhereInput
  }

  /**
   * DishCountOutputType without action
   */
  export type DishCountOutputTypeCountMealPlanDishesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealPlanDishWhereInput
  }


  /**
   * Count Type UserMealPlanCountOutputType
   */

  export type UserMealPlanCountOutputType = {
    mealPlanDishes: number
  }

  export type UserMealPlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mealPlanDishes?: boolean | UserMealPlanCountOutputTypeCountMealPlanDishesArgs
  }

  // Custom InputTypes
  /**
   * UserMealPlanCountOutputType without action
   */
  export type UserMealPlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMealPlanCountOutputType
     */
    select?: UserMealPlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserMealPlanCountOutputType without action
   */
  export type UserMealPlanCountOutputTypeCountMealPlanDishesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealPlanDishWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    passwordHash: string | null
    provider: string | null
    providerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    passwordHash: string | null
    provider: string | null
    providerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    passwordHash: number
    provider: number
    providerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    provider?: true
    providerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    provider?: true
    providerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    passwordHash?: true
    provider?: true
    providerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string
    email: string
    passwordHash: string | null
    provider: string
    providerId: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    provider?: boolean
    providerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    locations?: boolean | User$locationsArgs<ExtArgs>
    userDietaries?: boolean | User$userDietariesArgs<ExtArgs>
    mealPlans?: boolean | User$mealPlansArgs<ExtArgs>
    calorieLogs?: boolean | User$calorieLogsArgs<ExtArgs>
    restaurantReviews?: boolean | User$restaurantReviewsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    provider?: boolean
    providerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    provider?: boolean
    providerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    provider?: boolean
    providerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "passwordHash" | "provider" | "providerId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    locations?: boolean | User$locationsArgs<ExtArgs>
    userDietaries?: boolean | User$userDietariesArgs<ExtArgs>
    mealPlans?: boolean | User$mealPlansArgs<ExtArgs>
    calorieLogs?: boolean | User$calorieLogsArgs<ExtArgs>
    restaurantReviews?: boolean | User$restaurantReviewsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      locations: Prisma.$UserLocationPayload<ExtArgs>[]
      userDietaries: Prisma.$UserDietaryPayload<ExtArgs>[]
      mealPlans: Prisma.$UserMealPlanPayload<ExtArgs>[]
      calorieLogs: Prisma.$UserCalorieLogPayload<ExtArgs>[]
      restaurantReviews: Prisma.$RestaurantReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      passwordHash: string | null
      provider: string
      providerId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    locations<T extends User$locationsArgs<ExtArgs> = {}>(args?: Subset<T, User$locationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    userDietaries<T extends User$userDietariesArgs<ExtArgs> = {}>(args?: Subset<T, User$userDietariesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDietaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    mealPlans<T extends User$mealPlansArgs<ExtArgs> = {}>(args?: Subset<T, User$mealPlansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserMealPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    calorieLogs<T extends User$calorieLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$calorieLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCalorieLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    restaurantReviews<T extends User$restaurantReviewsArgs<ExtArgs> = {}>(args?: Subset<T, User$restaurantReviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly provider: FieldRef<"User", 'String'>
    readonly providerId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.locations
   */
  export type User$locationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
    where?: UserLocationWhereInput
    orderBy?: UserLocationOrderByWithRelationInput | UserLocationOrderByWithRelationInput[]
    cursor?: UserLocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserLocationScalarFieldEnum | UserLocationScalarFieldEnum[]
  }

  /**
   * User.userDietaries
   */
  export type User$userDietariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDietary
     */
    select?: UserDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDietary
     */
    omit?: UserDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDietaryInclude<ExtArgs> | null
    where?: UserDietaryWhereInput
    orderBy?: UserDietaryOrderByWithRelationInput | UserDietaryOrderByWithRelationInput[]
    cursor?: UserDietaryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserDietaryScalarFieldEnum | UserDietaryScalarFieldEnum[]
  }

  /**
   * User.mealPlans
   */
  export type User$mealPlansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMealPlan
     */
    select?: UserMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMealPlan
     */
    omit?: UserMealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMealPlanInclude<ExtArgs> | null
    where?: UserMealPlanWhereInput
    orderBy?: UserMealPlanOrderByWithRelationInput | UserMealPlanOrderByWithRelationInput[]
    cursor?: UserMealPlanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserMealPlanScalarFieldEnum | UserMealPlanScalarFieldEnum[]
  }

  /**
   * User.calorieLogs
   */
  export type User$calorieLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCalorieLog
     */
    select?: UserCalorieLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCalorieLog
     */
    omit?: UserCalorieLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCalorieLogInclude<ExtArgs> | null
    where?: UserCalorieLogWhereInput
    orderBy?: UserCalorieLogOrderByWithRelationInput | UserCalorieLogOrderByWithRelationInput[]
    cursor?: UserCalorieLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserCalorieLogScalarFieldEnum | UserCalorieLogScalarFieldEnum[]
  }

  /**
   * User.restaurantReviews
   */
  export type User$restaurantReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantReview
     */
    select?: RestaurantReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantReview
     */
    omit?: RestaurantReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantReviewInclude<ExtArgs> | null
    where?: RestaurantReviewWhereInput
    orderBy?: RestaurantReviewOrderByWithRelationInput | RestaurantReviewOrderByWithRelationInput[]
    cursor?: RestaurantReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RestaurantReviewScalarFieldEnum | RestaurantReviewScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserLocation
   */

  export type AggregateUserLocation = {
    _count: UserLocationCountAggregateOutputType | null
    _avg: UserLocationAvgAggregateOutputType | null
    _sum: UserLocationSumAggregateOutputType | null
    _min: UserLocationMinAggregateOutputType | null
    _max: UserLocationMaxAggregateOutputType | null
  }

  export type UserLocationAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    latitude: number | null
    longitude: number | null
  }

  export type UserLocationSumAggregateOutputType = {
    id: number | null
    userId: number | null
    latitude: number | null
    longitude: number | null
  }

  export type UserLocationMinAggregateOutputType = {
    id: number | null
    userId: number | null
    name: string | null
    latitude: number | null
    longitude: number | null
  }

  export type UserLocationMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    name: string | null
    latitude: number | null
    longitude: number | null
  }

  export type UserLocationCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    latitude: number
    longitude: number
    _all: number
  }


  export type UserLocationAvgAggregateInputType = {
    id?: true
    userId?: true
    latitude?: true
    longitude?: true
  }

  export type UserLocationSumAggregateInputType = {
    id?: true
    userId?: true
    latitude?: true
    longitude?: true
  }

  export type UserLocationMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    latitude?: true
    longitude?: true
  }

  export type UserLocationMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    latitude?: true
    longitude?: true
  }

  export type UserLocationCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    latitude?: true
    longitude?: true
    _all?: true
  }

  export type UserLocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserLocation to aggregate.
     */
    where?: UserLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLocations to fetch.
     */
    orderBy?: UserLocationOrderByWithRelationInput | UserLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserLocations
    **/
    _count?: true | UserLocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserLocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserLocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserLocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserLocationMaxAggregateInputType
  }

  export type GetUserLocationAggregateType<T extends UserLocationAggregateArgs> = {
        [P in keyof T & keyof AggregateUserLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserLocation[P]>
      : GetScalarType<T[P], AggregateUserLocation[P]>
  }




  export type UserLocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserLocationWhereInput
    orderBy?: UserLocationOrderByWithAggregationInput | UserLocationOrderByWithAggregationInput[]
    by: UserLocationScalarFieldEnum[] | UserLocationScalarFieldEnum
    having?: UserLocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserLocationCountAggregateInputType | true
    _avg?: UserLocationAvgAggregateInputType
    _sum?: UserLocationSumAggregateInputType
    _min?: UserLocationMinAggregateInputType
    _max?: UserLocationMaxAggregateInputType
  }

  export type UserLocationGroupByOutputType = {
    id: number
    userId: number
    name: string
    latitude: number
    longitude: number
    _count: UserLocationCountAggregateOutputType | null
    _avg: UserLocationAvgAggregateOutputType | null
    _sum: UserLocationSumAggregateOutputType | null
    _min: UserLocationMinAggregateOutputType | null
    _max: UserLocationMaxAggregateOutputType | null
  }

  type GetUserLocationGroupByPayload<T extends UserLocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserLocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserLocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserLocationGroupByOutputType[P]>
            : GetScalarType<T[P], UserLocationGroupByOutputType[P]>
        }
      >
    >


  export type UserLocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    latitude?: boolean
    longitude?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userLocation"]>

  export type UserLocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    latitude?: boolean
    longitude?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userLocation"]>

  export type UserLocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    latitude?: boolean
    longitude?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userLocation"]>

  export type UserLocationSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    latitude?: boolean
    longitude?: boolean
  }

  export type UserLocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "latitude" | "longitude", ExtArgs["result"]["userLocation"]>
  export type UserLocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserLocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserLocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserLocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserLocation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      name: string
      latitude: number
      longitude: number
    }, ExtArgs["result"]["userLocation"]>
    composites: {}
  }

  type UserLocationGetPayload<S extends boolean | null | undefined | UserLocationDefaultArgs> = $Result.GetResult<Prisma.$UserLocationPayload, S>

  type UserLocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserLocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserLocationCountAggregateInputType | true
    }

  export interface UserLocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserLocation'], meta: { name: 'UserLocation' } }
    /**
     * Find zero or one UserLocation that matches the filter.
     * @param {UserLocationFindUniqueArgs} args - Arguments to find a UserLocation
     * @example
     * // Get one UserLocation
     * const userLocation = await prisma.userLocation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserLocationFindUniqueArgs>(args: SelectSubset<T, UserLocationFindUniqueArgs<ExtArgs>>): Prisma__UserLocationClient<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserLocation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserLocationFindUniqueOrThrowArgs} args - Arguments to find a UserLocation
     * @example
     * // Get one UserLocation
     * const userLocation = await prisma.userLocation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserLocationFindUniqueOrThrowArgs>(args: SelectSubset<T, UserLocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserLocationClient<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserLocation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLocationFindFirstArgs} args - Arguments to find a UserLocation
     * @example
     * // Get one UserLocation
     * const userLocation = await prisma.userLocation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserLocationFindFirstArgs>(args?: SelectSubset<T, UserLocationFindFirstArgs<ExtArgs>>): Prisma__UserLocationClient<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserLocation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLocationFindFirstOrThrowArgs} args - Arguments to find a UserLocation
     * @example
     * // Get one UserLocation
     * const userLocation = await prisma.userLocation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserLocationFindFirstOrThrowArgs>(args?: SelectSubset<T, UserLocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserLocationClient<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserLocations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserLocations
     * const userLocations = await prisma.userLocation.findMany()
     * 
     * // Get first 10 UserLocations
     * const userLocations = await prisma.userLocation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userLocationWithIdOnly = await prisma.userLocation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserLocationFindManyArgs>(args?: SelectSubset<T, UserLocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserLocation.
     * @param {UserLocationCreateArgs} args - Arguments to create a UserLocation.
     * @example
     * // Create one UserLocation
     * const UserLocation = await prisma.userLocation.create({
     *   data: {
     *     // ... data to create a UserLocation
     *   }
     * })
     * 
     */
    create<T extends UserLocationCreateArgs>(args: SelectSubset<T, UserLocationCreateArgs<ExtArgs>>): Prisma__UserLocationClient<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserLocations.
     * @param {UserLocationCreateManyArgs} args - Arguments to create many UserLocations.
     * @example
     * // Create many UserLocations
     * const userLocation = await prisma.userLocation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserLocationCreateManyArgs>(args?: SelectSubset<T, UserLocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserLocations and returns the data saved in the database.
     * @param {UserLocationCreateManyAndReturnArgs} args - Arguments to create many UserLocations.
     * @example
     * // Create many UserLocations
     * const userLocation = await prisma.userLocation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserLocations and only return the `id`
     * const userLocationWithIdOnly = await prisma.userLocation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserLocationCreateManyAndReturnArgs>(args?: SelectSubset<T, UserLocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserLocation.
     * @param {UserLocationDeleteArgs} args - Arguments to delete one UserLocation.
     * @example
     * // Delete one UserLocation
     * const UserLocation = await prisma.userLocation.delete({
     *   where: {
     *     // ... filter to delete one UserLocation
     *   }
     * })
     * 
     */
    delete<T extends UserLocationDeleteArgs>(args: SelectSubset<T, UserLocationDeleteArgs<ExtArgs>>): Prisma__UserLocationClient<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserLocation.
     * @param {UserLocationUpdateArgs} args - Arguments to update one UserLocation.
     * @example
     * // Update one UserLocation
     * const userLocation = await prisma.userLocation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserLocationUpdateArgs>(args: SelectSubset<T, UserLocationUpdateArgs<ExtArgs>>): Prisma__UserLocationClient<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserLocations.
     * @param {UserLocationDeleteManyArgs} args - Arguments to filter UserLocations to delete.
     * @example
     * // Delete a few UserLocations
     * const { count } = await prisma.userLocation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserLocationDeleteManyArgs>(args?: SelectSubset<T, UserLocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserLocations
     * const userLocation = await prisma.userLocation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserLocationUpdateManyArgs>(args: SelectSubset<T, UserLocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserLocations and returns the data updated in the database.
     * @param {UserLocationUpdateManyAndReturnArgs} args - Arguments to update many UserLocations.
     * @example
     * // Update many UserLocations
     * const userLocation = await prisma.userLocation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserLocations and only return the `id`
     * const userLocationWithIdOnly = await prisma.userLocation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserLocationUpdateManyAndReturnArgs>(args: SelectSubset<T, UserLocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserLocation.
     * @param {UserLocationUpsertArgs} args - Arguments to update or create a UserLocation.
     * @example
     * // Update or create a UserLocation
     * const userLocation = await prisma.userLocation.upsert({
     *   create: {
     *     // ... data to create a UserLocation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserLocation we want to update
     *   }
     * })
     */
    upsert<T extends UserLocationUpsertArgs>(args: SelectSubset<T, UserLocationUpsertArgs<ExtArgs>>): Prisma__UserLocationClient<$Result.GetResult<Prisma.$UserLocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserLocations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLocationCountArgs} args - Arguments to filter UserLocations to count.
     * @example
     * // Count the number of UserLocations
     * const count = await prisma.userLocation.count({
     *   where: {
     *     // ... the filter for the UserLocations we want to count
     *   }
     * })
    **/
    count<T extends UserLocationCountArgs>(
      args?: Subset<T, UserLocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserLocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserLocationAggregateArgs>(args: Subset<T, UserLocationAggregateArgs>): Prisma.PrismaPromise<GetUserLocationAggregateType<T>>

    /**
     * Group by UserLocation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserLocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserLocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserLocationGroupByArgs['orderBy'] }
        : { orderBy?: UserLocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserLocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserLocation model
   */
  readonly fields: UserLocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserLocation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserLocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserLocation model
   */
  interface UserLocationFieldRefs {
    readonly id: FieldRef<"UserLocation", 'Int'>
    readonly userId: FieldRef<"UserLocation", 'Int'>
    readonly name: FieldRef<"UserLocation", 'String'>
    readonly latitude: FieldRef<"UserLocation", 'Float'>
    readonly longitude: FieldRef<"UserLocation", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * UserLocation findUnique
   */
  export type UserLocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
    /**
     * Filter, which UserLocation to fetch.
     */
    where: UserLocationWhereUniqueInput
  }

  /**
   * UserLocation findUniqueOrThrow
   */
  export type UserLocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
    /**
     * Filter, which UserLocation to fetch.
     */
    where: UserLocationWhereUniqueInput
  }

  /**
   * UserLocation findFirst
   */
  export type UserLocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
    /**
     * Filter, which UserLocation to fetch.
     */
    where?: UserLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLocations to fetch.
     */
    orderBy?: UserLocationOrderByWithRelationInput | UserLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserLocations.
     */
    cursor?: UserLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserLocations.
     */
    distinct?: UserLocationScalarFieldEnum | UserLocationScalarFieldEnum[]
  }

  /**
   * UserLocation findFirstOrThrow
   */
  export type UserLocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
    /**
     * Filter, which UserLocation to fetch.
     */
    where?: UserLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLocations to fetch.
     */
    orderBy?: UserLocationOrderByWithRelationInput | UserLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserLocations.
     */
    cursor?: UserLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLocations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserLocations.
     */
    distinct?: UserLocationScalarFieldEnum | UserLocationScalarFieldEnum[]
  }

  /**
   * UserLocation findMany
   */
  export type UserLocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
    /**
     * Filter, which UserLocations to fetch.
     */
    where?: UserLocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserLocations to fetch.
     */
    orderBy?: UserLocationOrderByWithRelationInput | UserLocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserLocations.
     */
    cursor?: UserLocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserLocations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserLocations.
     */
    skip?: number
    distinct?: UserLocationScalarFieldEnum | UserLocationScalarFieldEnum[]
  }

  /**
   * UserLocation create
   */
  export type UserLocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
    /**
     * The data needed to create a UserLocation.
     */
    data: XOR<UserLocationCreateInput, UserLocationUncheckedCreateInput>
  }

  /**
   * UserLocation createMany
   */
  export type UserLocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserLocations.
     */
    data: UserLocationCreateManyInput | UserLocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserLocation createManyAndReturn
   */
  export type UserLocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * The data used to create many UserLocations.
     */
    data: UserLocationCreateManyInput | UserLocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserLocation update
   */
  export type UserLocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
    /**
     * The data needed to update a UserLocation.
     */
    data: XOR<UserLocationUpdateInput, UserLocationUncheckedUpdateInput>
    /**
     * Choose, which UserLocation to update.
     */
    where: UserLocationWhereUniqueInput
  }

  /**
   * UserLocation updateMany
   */
  export type UserLocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserLocations.
     */
    data: XOR<UserLocationUpdateManyMutationInput, UserLocationUncheckedUpdateManyInput>
    /**
     * Filter which UserLocations to update
     */
    where?: UserLocationWhereInput
    /**
     * Limit how many UserLocations to update.
     */
    limit?: number
  }

  /**
   * UserLocation updateManyAndReturn
   */
  export type UserLocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * The data used to update UserLocations.
     */
    data: XOR<UserLocationUpdateManyMutationInput, UserLocationUncheckedUpdateManyInput>
    /**
     * Filter which UserLocations to update
     */
    where?: UserLocationWhereInput
    /**
     * Limit how many UserLocations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserLocation upsert
   */
  export type UserLocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
    /**
     * The filter to search for the UserLocation to update in case it exists.
     */
    where: UserLocationWhereUniqueInput
    /**
     * In case the UserLocation found by the `where` argument doesn't exist, create a new UserLocation with this data.
     */
    create: XOR<UserLocationCreateInput, UserLocationUncheckedCreateInput>
    /**
     * In case the UserLocation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserLocationUpdateInput, UserLocationUncheckedUpdateInput>
  }

  /**
   * UserLocation delete
   */
  export type UserLocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
    /**
     * Filter which UserLocation to delete.
     */
    where: UserLocationWhereUniqueInput
  }

  /**
   * UserLocation deleteMany
   */
  export type UserLocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserLocations to delete
     */
    where?: UserLocationWhereInput
    /**
     * Limit how many UserLocations to delete.
     */
    limit?: number
  }

  /**
   * UserLocation without action
   */
  export type UserLocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserLocation
     */
    select?: UserLocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserLocation
     */
    omit?: UserLocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserLocationInclude<ExtArgs> | null
  }


  /**
   * Model DietaryRestriction
   */

  export type AggregateDietaryRestriction = {
    _count: DietaryRestrictionCountAggregateOutputType | null
    _avg: DietaryRestrictionAvgAggregateOutputType | null
    _sum: DietaryRestrictionSumAggregateOutputType | null
    _min: DietaryRestrictionMinAggregateOutputType | null
    _max: DietaryRestrictionMaxAggregateOutputType | null
  }

  export type DietaryRestrictionAvgAggregateOutputType = {
    id: number | null
  }

  export type DietaryRestrictionSumAggregateOutputType = {
    id: number | null
  }

  export type DietaryRestrictionMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DietaryRestrictionMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DietaryRestrictionCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DietaryRestrictionAvgAggregateInputType = {
    id?: true
  }

  export type DietaryRestrictionSumAggregateInputType = {
    id?: true
  }

  export type DietaryRestrictionMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DietaryRestrictionMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DietaryRestrictionCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DietaryRestrictionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DietaryRestriction to aggregate.
     */
    where?: DietaryRestrictionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DietaryRestrictions to fetch.
     */
    orderBy?: DietaryRestrictionOrderByWithRelationInput | DietaryRestrictionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DietaryRestrictionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DietaryRestrictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DietaryRestrictions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DietaryRestrictions
    **/
    _count?: true | DietaryRestrictionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DietaryRestrictionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DietaryRestrictionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DietaryRestrictionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DietaryRestrictionMaxAggregateInputType
  }

  export type GetDietaryRestrictionAggregateType<T extends DietaryRestrictionAggregateArgs> = {
        [P in keyof T & keyof AggregateDietaryRestriction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDietaryRestriction[P]>
      : GetScalarType<T[P], AggregateDietaryRestriction[P]>
  }




  export type DietaryRestrictionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DietaryRestrictionWhereInput
    orderBy?: DietaryRestrictionOrderByWithAggregationInput | DietaryRestrictionOrderByWithAggregationInput[]
    by: DietaryRestrictionScalarFieldEnum[] | DietaryRestrictionScalarFieldEnum
    having?: DietaryRestrictionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DietaryRestrictionCountAggregateInputType | true
    _avg?: DietaryRestrictionAvgAggregateInputType
    _sum?: DietaryRestrictionSumAggregateInputType
    _min?: DietaryRestrictionMinAggregateInputType
    _max?: DietaryRestrictionMaxAggregateInputType
  }

  export type DietaryRestrictionGroupByOutputType = {
    id: number
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: DietaryRestrictionCountAggregateOutputType | null
    _avg: DietaryRestrictionAvgAggregateOutputType | null
    _sum: DietaryRestrictionSumAggregateOutputType | null
    _min: DietaryRestrictionMinAggregateOutputType | null
    _max: DietaryRestrictionMaxAggregateOutputType | null
  }

  type GetDietaryRestrictionGroupByPayload<T extends DietaryRestrictionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DietaryRestrictionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DietaryRestrictionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DietaryRestrictionGroupByOutputType[P]>
            : GetScalarType<T[P], DietaryRestrictionGroupByOutputType[P]>
        }
      >
    >


  export type DietaryRestrictionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userDietaries?: boolean | DietaryRestriction$userDietariesArgs<ExtArgs>
    dishDietaries?: boolean | DietaryRestriction$dishDietariesArgs<ExtArgs>
    _count?: boolean | DietaryRestrictionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dietaryRestriction"]>

  export type DietaryRestrictionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dietaryRestriction"]>

  export type DietaryRestrictionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dietaryRestriction"]>

  export type DietaryRestrictionSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DietaryRestrictionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["dietaryRestriction"]>
  export type DietaryRestrictionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userDietaries?: boolean | DietaryRestriction$userDietariesArgs<ExtArgs>
    dishDietaries?: boolean | DietaryRestriction$dishDietariesArgs<ExtArgs>
    _count?: boolean | DietaryRestrictionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DietaryRestrictionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DietaryRestrictionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DietaryRestrictionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DietaryRestriction"
    objects: {
      userDietaries: Prisma.$UserDietaryPayload<ExtArgs>[]
      dishDietaries: Prisma.$DishDietaryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dietaryRestriction"]>
    composites: {}
  }

  type DietaryRestrictionGetPayload<S extends boolean | null | undefined | DietaryRestrictionDefaultArgs> = $Result.GetResult<Prisma.$DietaryRestrictionPayload, S>

  type DietaryRestrictionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DietaryRestrictionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DietaryRestrictionCountAggregateInputType | true
    }

  export interface DietaryRestrictionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DietaryRestriction'], meta: { name: 'DietaryRestriction' } }
    /**
     * Find zero or one DietaryRestriction that matches the filter.
     * @param {DietaryRestrictionFindUniqueArgs} args - Arguments to find a DietaryRestriction
     * @example
     * // Get one DietaryRestriction
     * const dietaryRestriction = await prisma.dietaryRestriction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DietaryRestrictionFindUniqueArgs>(args: SelectSubset<T, DietaryRestrictionFindUniqueArgs<ExtArgs>>): Prisma__DietaryRestrictionClient<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DietaryRestriction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DietaryRestrictionFindUniqueOrThrowArgs} args - Arguments to find a DietaryRestriction
     * @example
     * // Get one DietaryRestriction
     * const dietaryRestriction = await prisma.dietaryRestriction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DietaryRestrictionFindUniqueOrThrowArgs>(args: SelectSubset<T, DietaryRestrictionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DietaryRestrictionClient<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DietaryRestriction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietaryRestrictionFindFirstArgs} args - Arguments to find a DietaryRestriction
     * @example
     * // Get one DietaryRestriction
     * const dietaryRestriction = await prisma.dietaryRestriction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DietaryRestrictionFindFirstArgs>(args?: SelectSubset<T, DietaryRestrictionFindFirstArgs<ExtArgs>>): Prisma__DietaryRestrictionClient<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DietaryRestriction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietaryRestrictionFindFirstOrThrowArgs} args - Arguments to find a DietaryRestriction
     * @example
     * // Get one DietaryRestriction
     * const dietaryRestriction = await prisma.dietaryRestriction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DietaryRestrictionFindFirstOrThrowArgs>(args?: SelectSubset<T, DietaryRestrictionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DietaryRestrictionClient<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DietaryRestrictions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietaryRestrictionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DietaryRestrictions
     * const dietaryRestrictions = await prisma.dietaryRestriction.findMany()
     * 
     * // Get first 10 DietaryRestrictions
     * const dietaryRestrictions = await prisma.dietaryRestriction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dietaryRestrictionWithIdOnly = await prisma.dietaryRestriction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DietaryRestrictionFindManyArgs>(args?: SelectSubset<T, DietaryRestrictionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DietaryRestriction.
     * @param {DietaryRestrictionCreateArgs} args - Arguments to create a DietaryRestriction.
     * @example
     * // Create one DietaryRestriction
     * const DietaryRestriction = await prisma.dietaryRestriction.create({
     *   data: {
     *     // ... data to create a DietaryRestriction
     *   }
     * })
     * 
     */
    create<T extends DietaryRestrictionCreateArgs>(args: SelectSubset<T, DietaryRestrictionCreateArgs<ExtArgs>>): Prisma__DietaryRestrictionClient<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DietaryRestrictions.
     * @param {DietaryRestrictionCreateManyArgs} args - Arguments to create many DietaryRestrictions.
     * @example
     * // Create many DietaryRestrictions
     * const dietaryRestriction = await prisma.dietaryRestriction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DietaryRestrictionCreateManyArgs>(args?: SelectSubset<T, DietaryRestrictionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DietaryRestrictions and returns the data saved in the database.
     * @param {DietaryRestrictionCreateManyAndReturnArgs} args - Arguments to create many DietaryRestrictions.
     * @example
     * // Create many DietaryRestrictions
     * const dietaryRestriction = await prisma.dietaryRestriction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DietaryRestrictions and only return the `id`
     * const dietaryRestrictionWithIdOnly = await prisma.dietaryRestriction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DietaryRestrictionCreateManyAndReturnArgs>(args?: SelectSubset<T, DietaryRestrictionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DietaryRestriction.
     * @param {DietaryRestrictionDeleteArgs} args - Arguments to delete one DietaryRestriction.
     * @example
     * // Delete one DietaryRestriction
     * const DietaryRestriction = await prisma.dietaryRestriction.delete({
     *   where: {
     *     // ... filter to delete one DietaryRestriction
     *   }
     * })
     * 
     */
    delete<T extends DietaryRestrictionDeleteArgs>(args: SelectSubset<T, DietaryRestrictionDeleteArgs<ExtArgs>>): Prisma__DietaryRestrictionClient<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DietaryRestriction.
     * @param {DietaryRestrictionUpdateArgs} args - Arguments to update one DietaryRestriction.
     * @example
     * // Update one DietaryRestriction
     * const dietaryRestriction = await prisma.dietaryRestriction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DietaryRestrictionUpdateArgs>(args: SelectSubset<T, DietaryRestrictionUpdateArgs<ExtArgs>>): Prisma__DietaryRestrictionClient<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DietaryRestrictions.
     * @param {DietaryRestrictionDeleteManyArgs} args - Arguments to filter DietaryRestrictions to delete.
     * @example
     * // Delete a few DietaryRestrictions
     * const { count } = await prisma.dietaryRestriction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DietaryRestrictionDeleteManyArgs>(args?: SelectSubset<T, DietaryRestrictionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DietaryRestrictions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietaryRestrictionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DietaryRestrictions
     * const dietaryRestriction = await prisma.dietaryRestriction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DietaryRestrictionUpdateManyArgs>(args: SelectSubset<T, DietaryRestrictionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DietaryRestrictions and returns the data updated in the database.
     * @param {DietaryRestrictionUpdateManyAndReturnArgs} args - Arguments to update many DietaryRestrictions.
     * @example
     * // Update many DietaryRestrictions
     * const dietaryRestriction = await prisma.dietaryRestriction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DietaryRestrictions and only return the `id`
     * const dietaryRestrictionWithIdOnly = await prisma.dietaryRestriction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DietaryRestrictionUpdateManyAndReturnArgs>(args: SelectSubset<T, DietaryRestrictionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DietaryRestriction.
     * @param {DietaryRestrictionUpsertArgs} args - Arguments to update or create a DietaryRestriction.
     * @example
     * // Update or create a DietaryRestriction
     * const dietaryRestriction = await prisma.dietaryRestriction.upsert({
     *   create: {
     *     // ... data to create a DietaryRestriction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DietaryRestriction we want to update
     *   }
     * })
     */
    upsert<T extends DietaryRestrictionUpsertArgs>(args: SelectSubset<T, DietaryRestrictionUpsertArgs<ExtArgs>>): Prisma__DietaryRestrictionClient<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DietaryRestrictions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietaryRestrictionCountArgs} args - Arguments to filter DietaryRestrictions to count.
     * @example
     * // Count the number of DietaryRestrictions
     * const count = await prisma.dietaryRestriction.count({
     *   where: {
     *     // ... the filter for the DietaryRestrictions we want to count
     *   }
     * })
    **/
    count<T extends DietaryRestrictionCountArgs>(
      args?: Subset<T, DietaryRestrictionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DietaryRestrictionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DietaryRestriction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietaryRestrictionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DietaryRestrictionAggregateArgs>(args: Subset<T, DietaryRestrictionAggregateArgs>): Prisma.PrismaPromise<GetDietaryRestrictionAggregateType<T>>

    /**
     * Group by DietaryRestriction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DietaryRestrictionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DietaryRestrictionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DietaryRestrictionGroupByArgs['orderBy'] }
        : { orderBy?: DietaryRestrictionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DietaryRestrictionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDietaryRestrictionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DietaryRestriction model
   */
  readonly fields: DietaryRestrictionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DietaryRestriction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DietaryRestrictionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userDietaries<T extends DietaryRestriction$userDietariesArgs<ExtArgs> = {}>(args?: Subset<T, DietaryRestriction$userDietariesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDietaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    dishDietaries<T extends DietaryRestriction$dishDietariesArgs<ExtArgs> = {}>(args?: Subset<T, DietaryRestriction$dishDietariesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DishDietaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DietaryRestriction model
   */
  interface DietaryRestrictionFieldRefs {
    readonly id: FieldRef<"DietaryRestriction", 'Int'>
    readonly name: FieldRef<"DietaryRestriction", 'String'>
    readonly description: FieldRef<"DietaryRestriction", 'String'>
    readonly createdAt: FieldRef<"DietaryRestriction", 'DateTime'>
    readonly updatedAt: FieldRef<"DietaryRestriction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DietaryRestriction findUnique
   */
  export type DietaryRestrictionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
    /**
     * Filter, which DietaryRestriction to fetch.
     */
    where: DietaryRestrictionWhereUniqueInput
  }

  /**
   * DietaryRestriction findUniqueOrThrow
   */
  export type DietaryRestrictionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
    /**
     * Filter, which DietaryRestriction to fetch.
     */
    where: DietaryRestrictionWhereUniqueInput
  }

  /**
   * DietaryRestriction findFirst
   */
  export type DietaryRestrictionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
    /**
     * Filter, which DietaryRestriction to fetch.
     */
    where?: DietaryRestrictionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DietaryRestrictions to fetch.
     */
    orderBy?: DietaryRestrictionOrderByWithRelationInput | DietaryRestrictionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DietaryRestrictions.
     */
    cursor?: DietaryRestrictionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DietaryRestrictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DietaryRestrictions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DietaryRestrictions.
     */
    distinct?: DietaryRestrictionScalarFieldEnum | DietaryRestrictionScalarFieldEnum[]
  }

  /**
   * DietaryRestriction findFirstOrThrow
   */
  export type DietaryRestrictionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
    /**
     * Filter, which DietaryRestriction to fetch.
     */
    where?: DietaryRestrictionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DietaryRestrictions to fetch.
     */
    orderBy?: DietaryRestrictionOrderByWithRelationInput | DietaryRestrictionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DietaryRestrictions.
     */
    cursor?: DietaryRestrictionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DietaryRestrictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DietaryRestrictions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DietaryRestrictions.
     */
    distinct?: DietaryRestrictionScalarFieldEnum | DietaryRestrictionScalarFieldEnum[]
  }

  /**
   * DietaryRestriction findMany
   */
  export type DietaryRestrictionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
    /**
     * Filter, which DietaryRestrictions to fetch.
     */
    where?: DietaryRestrictionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DietaryRestrictions to fetch.
     */
    orderBy?: DietaryRestrictionOrderByWithRelationInput | DietaryRestrictionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DietaryRestrictions.
     */
    cursor?: DietaryRestrictionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DietaryRestrictions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DietaryRestrictions.
     */
    skip?: number
    distinct?: DietaryRestrictionScalarFieldEnum | DietaryRestrictionScalarFieldEnum[]
  }

  /**
   * DietaryRestriction create
   */
  export type DietaryRestrictionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
    /**
     * The data needed to create a DietaryRestriction.
     */
    data: XOR<DietaryRestrictionCreateInput, DietaryRestrictionUncheckedCreateInput>
  }

  /**
   * DietaryRestriction createMany
   */
  export type DietaryRestrictionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DietaryRestrictions.
     */
    data: DietaryRestrictionCreateManyInput | DietaryRestrictionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DietaryRestriction createManyAndReturn
   */
  export type DietaryRestrictionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * The data used to create many DietaryRestrictions.
     */
    data: DietaryRestrictionCreateManyInput | DietaryRestrictionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DietaryRestriction update
   */
  export type DietaryRestrictionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
    /**
     * The data needed to update a DietaryRestriction.
     */
    data: XOR<DietaryRestrictionUpdateInput, DietaryRestrictionUncheckedUpdateInput>
    /**
     * Choose, which DietaryRestriction to update.
     */
    where: DietaryRestrictionWhereUniqueInput
  }

  /**
   * DietaryRestriction updateMany
   */
  export type DietaryRestrictionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DietaryRestrictions.
     */
    data: XOR<DietaryRestrictionUpdateManyMutationInput, DietaryRestrictionUncheckedUpdateManyInput>
    /**
     * Filter which DietaryRestrictions to update
     */
    where?: DietaryRestrictionWhereInput
    /**
     * Limit how many DietaryRestrictions to update.
     */
    limit?: number
  }

  /**
   * DietaryRestriction updateManyAndReturn
   */
  export type DietaryRestrictionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * The data used to update DietaryRestrictions.
     */
    data: XOR<DietaryRestrictionUpdateManyMutationInput, DietaryRestrictionUncheckedUpdateManyInput>
    /**
     * Filter which DietaryRestrictions to update
     */
    where?: DietaryRestrictionWhereInput
    /**
     * Limit how many DietaryRestrictions to update.
     */
    limit?: number
  }

  /**
   * DietaryRestriction upsert
   */
  export type DietaryRestrictionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
    /**
     * The filter to search for the DietaryRestriction to update in case it exists.
     */
    where: DietaryRestrictionWhereUniqueInput
    /**
     * In case the DietaryRestriction found by the `where` argument doesn't exist, create a new DietaryRestriction with this data.
     */
    create: XOR<DietaryRestrictionCreateInput, DietaryRestrictionUncheckedCreateInput>
    /**
     * In case the DietaryRestriction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DietaryRestrictionUpdateInput, DietaryRestrictionUncheckedUpdateInput>
  }

  /**
   * DietaryRestriction delete
   */
  export type DietaryRestrictionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
    /**
     * Filter which DietaryRestriction to delete.
     */
    where: DietaryRestrictionWhereUniqueInput
  }

  /**
   * DietaryRestriction deleteMany
   */
  export type DietaryRestrictionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DietaryRestrictions to delete
     */
    where?: DietaryRestrictionWhereInput
    /**
     * Limit how many DietaryRestrictions to delete.
     */
    limit?: number
  }

  /**
   * DietaryRestriction.userDietaries
   */
  export type DietaryRestriction$userDietariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDietary
     */
    select?: UserDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDietary
     */
    omit?: UserDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDietaryInclude<ExtArgs> | null
    where?: UserDietaryWhereInput
    orderBy?: UserDietaryOrderByWithRelationInput | UserDietaryOrderByWithRelationInput[]
    cursor?: UserDietaryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserDietaryScalarFieldEnum | UserDietaryScalarFieldEnum[]
  }

  /**
   * DietaryRestriction.dishDietaries
   */
  export type DietaryRestriction$dishDietariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DishDietary
     */
    select?: DishDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DishDietary
     */
    omit?: DishDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishDietaryInclude<ExtArgs> | null
    where?: DishDietaryWhereInput
    orderBy?: DishDietaryOrderByWithRelationInput | DishDietaryOrderByWithRelationInput[]
    cursor?: DishDietaryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DishDietaryScalarFieldEnum | DishDietaryScalarFieldEnum[]
  }

  /**
   * DietaryRestriction without action
   */
  export type DietaryRestrictionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DietaryRestriction
     */
    select?: DietaryRestrictionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DietaryRestriction
     */
    omit?: DietaryRestrictionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DietaryRestrictionInclude<ExtArgs> | null
  }


  /**
   * Model UserDietary
   */

  export type AggregateUserDietary = {
    _count: UserDietaryCountAggregateOutputType | null
    _avg: UserDietaryAvgAggregateOutputType | null
    _sum: UserDietarySumAggregateOutputType | null
    _min: UserDietaryMinAggregateOutputType | null
    _max: UserDietaryMaxAggregateOutputType | null
  }

  export type UserDietaryAvgAggregateOutputType = {
    userId: number | null
    dietaryId: number | null
  }

  export type UserDietarySumAggregateOutputType = {
    userId: number | null
    dietaryId: number | null
  }

  export type UserDietaryMinAggregateOutputType = {
    userId: number | null
    dietaryId: number | null
  }

  export type UserDietaryMaxAggregateOutputType = {
    userId: number | null
    dietaryId: number | null
  }

  export type UserDietaryCountAggregateOutputType = {
    userId: number
    dietaryId: number
    _all: number
  }


  export type UserDietaryAvgAggregateInputType = {
    userId?: true
    dietaryId?: true
  }

  export type UserDietarySumAggregateInputType = {
    userId?: true
    dietaryId?: true
  }

  export type UserDietaryMinAggregateInputType = {
    userId?: true
    dietaryId?: true
  }

  export type UserDietaryMaxAggregateInputType = {
    userId?: true
    dietaryId?: true
  }

  export type UserDietaryCountAggregateInputType = {
    userId?: true
    dietaryId?: true
    _all?: true
  }

  export type UserDietaryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserDietary to aggregate.
     */
    where?: UserDietaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDietaries to fetch.
     */
    orderBy?: UserDietaryOrderByWithRelationInput | UserDietaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserDietaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDietaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDietaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserDietaries
    **/
    _count?: true | UserDietaryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserDietaryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserDietarySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserDietaryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserDietaryMaxAggregateInputType
  }

  export type GetUserDietaryAggregateType<T extends UserDietaryAggregateArgs> = {
        [P in keyof T & keyof AggregateUserDietary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserDietary[P]>
      : GetScalarType<T[P], AggregateUserDietary[P]>
  }




  export type UserDietaryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDietaryWhereInput
    orderBy?: UserDietaryOrderByWithAggregationInput | UserDietaryOrderByWithAggregationInput[]
    by: UserDietaryScalarFieldEnum[] | UserDietaryScalarFieldEnum
    having?: UserDietaryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserDietaryCountAggregateInputType | true
    _avg?: UserDietaryAvgAggregateInputType
    _sum?: UserDietarySumAggregateInputType
    _min?: UserDietaryMinAggregateInputType
    _max?: UserDietaryMaxAggregateInputType
  }

  export type UserDietaryGroupByOutputType = {
    userId: number
    dietaryId: number
    _count: UserDietaryCountAggregateOutputType | null
    _avg: UserDietaryAvgAggregateOutputType | null
    _sum: UserDietarySumAggregateOutputType | null
    _min: UserDietaryMinAggregateOutputType | null
    _max: UserDietaryMaxAggregateOutputType | null
  }

  type GetUserDietaryGroupByPayload<T extends UserDietaryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserDietaryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserDietaryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserDietaryGroupByOutputType[P]>
            : GetScalarType<T[P], UserDietaryGroupByOutputType[P]>
        }
      >
    >


  export type UserDietarySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    dietaryId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    dietary?: boolean | DietaryRestrictionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userDietary"]>

  export type UserDietarySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    dietaryId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    dietary?: boolean | DietaryRestrictionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userDietary"]>

  export type UserDietarySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    dietaryId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    dietary?: boolean | DietaryRestrictionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userDietary"]>

  export type UserDietarySelectScalar = {
    userId?: boolean
    dietaryId?: boolean
  }

  export type UserDietaryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "dietaryId", ExtArgs["result"]["userDietary"]>
  export type UserDietaryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    dietary?: boolean | DietaryRestrictionDefaultArgs<ExtArgs>
  }
  export type UserDietaryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    dietary?: boolean | DietaryRestrictionDefaultArgs<ExtArgs>
  }
  export type UserDietaryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    dietary?: boolean | DietaryRestrictionDefaultArgs<ExtArgs>
  }

  export type $UserDietaryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserDietary"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      dietary: Prisma.$DietaryRestrictionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: number
      dietaryId: number
    }, ExtArgs["result"]["userDietary"]>
    composites: {}
  }

  type UserDietaryGetPayload<S extends boolean | null | undefined | UserDietaryDefaultArgs> = $Result.GetResult<Prisma.$UserDietaryPayload, S>

  type UserDietaryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserDietaryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserDietaryCountAggregateInputType | true
    }

  export interface UserDietaryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserDietary'], meta: { name: 'UserDietary' } }
    /**
     * Find zero or one UserDietary that matches the filter.
     * @param {UserDietaryFindUniqueArgs} args - Arguments to find a UserDietary
     * @example
     * // Get one UserDietary
     * const userDietary = await prisma.userDietary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserDietaryFindUniqueArgs>(args: SelectSubset<T, UserDietaryFindUniqueArgs<ExtArgs>>): Prisma__UserDietaryClient<$Result.GetResult<Prisma.$UserDietaryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserDietary that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserDietaryFindUniqueOrThrowArgs} args - Arguments to find a UserDietary
     * @example
     * // Get one UserDietary
     * const userDietary = await prisma.userDietary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserDietaryFindUniqueOrThrowArgs>(args: SelectSubset<T, UserDietaryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserDietaryClient<$Result.GetResult<Prisma.$UserDietaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserDietary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDietaryFindFirstArgs} args - Arguments to find a UserDietary
     * @example
     * // Get one UserDietary
     * const userDietary = await prisma.userDietary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserDietaryFindFirstArgs>(args?: SelectSubset<T, UserDietaryFindFirstArgs<ExtArgs>>): Prisma__UserDietaryClient<$Result.GetResult<Prisma.$UserDietaryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserDietary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDietaryFindFirstOrThrowArgs} args - Arguments to find a UserDietary
     * @example
     * // Get one UserDietary
     * const userDietary = await prisma.userDietary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserDietaryFindFirstOrThrowArgs>(args?: SelectSubset<T, UserDietaryFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserDietaryClient<$Result.GetResult<Prisma.$UserDietaryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserDietaries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDietaryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserDietaries
     * const userDietaries = await prisma.userDietary.findMany()
     * 
     * // Get first 10 UserDietaries
     * const userDietaries = await prisma.userDietary.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userDietaryWithUserIdOnly = await prisma.userDietary.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserDietaryFindManyArgs>(args?: SelectSubset<T, UserDietaryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDietaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserDietary.
     * @param {UserDietaryCreateArgs} args - Arguments to create a UserDietary.
     * @example
     * // Create one UserDietary
     * const UserDietary = await prisma.userDietary.create({
     *   data: {
     *     // ... data to create a UserDietary
     *   }
     * })
     * 
     */
    create<T extends UserDietaryCreateArgs>(args: SelectSubset<T, UserDietaryCreateArgs<ExtArgs>>): Prisma__UserDietaryClient<$Result.GetResult<Prisma.$UserDietaryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserDietaries.
     * @param {UserDietaryCreateManyArgs} args - Arguments to create many UserDietaries.
     * @example
     * // Create many UserDietaries
     * const userDietary = await prisma.userDietary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserDietaryCreateManyArgs>(args?: SelectSubset<T, UserDietaryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserDietaries and returns the data saved in the database.
     * @param {UserDietaryCreateManyAndReturnArgs} args - Arguments to create many UserDietaries.
     * @example
     * // Create many UserDietaries
     * const userDietary = await prisma.userDietary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserDietaries and only return the `userId`
     * const userDietaryWithUserIdOnly = await prisma.userDietary.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserDietaryCreateManyAndReturnArgs>(args?: SelectSubset<T, UserDietaryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDietaryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserDietary.
     * @param {UserDietaryDeleteArgs} args - Arguments to delete one UserDietary.
     * @example
     * // Delete one UserDietary
     * const UserDietary = await prisma.userDietary.delete({
     *   where: {
     *     // ... filter to delete one UserDietary
     *   }
     * })
     * 
     */
    delete<T extends UserDietaryDeleteArgs>(args: SelectSubset<T, UserDietaryDeleteArgs<ExtArgs>>): Prisma__UserDietaryClient<$Result.GetResult<Prisma.$UserDietaryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserDietary.
     * @param {UserDietaryUpdateArgs} args - Arguments to update one UserDietary.
     * @example
     * // Update one UserDietary
     * const userDietary = await prisma.userDietary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserDietaryUpdateArgs>(args: SelectSubset<T, UserDietaryUpdateArgs<ExtArgs>>): Prisma__UserDietaryClient<$Result.GetResult<Prisma.$UserDietaryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserDietaries.
     * @param {UserDietaryDeleteManyArgs} args - Arguments to filter UserDietaries to delete.
     * @example
     * // Delete a few UserDietaries
     * const { count } = await prisma.userDietary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDietaryDeleteManyArgs>(args?: SelectSubset<T, UserDietaryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserDietaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDietaryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserDietaries
     * const userDietary = await prisma.userDietary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserDietaryUpdateManyArgs>(args: SelectSubset<T, UserDietaryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserDietaries and returns the data updated in the database.
     * @param {UserDietaryUpdateManyAndReturnArgs} args - Arguments to update many UserDietaries.
     * @example
     * // Update many UserDietaries
     * const userDietary = await prisma.userDietary.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserDietaries and only return the `userId`
     * const userDietaryWithUserIdOnly = await prisma.userDietary.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserDietaryUpdateManyAndReturnArgs>(args: SelectSubset<T, UserDietaryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDietaryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserDietary.
     * @param {UserDietaryUpsertArgs} args - Arguments to update or create a UserDietary.
     * @example
     * // Update or create a UserDietary
     * const userDietary = await prisma.userDietary.upsert({
     *   create: {
     *     // ... data to create a UserDietary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserDietary we want to update
     *   }
     * })
     */
    upsert<T extends UserDietaryUpsertArgs>(args: SelectSubset<T, UserDietaryUpsertArgs<ExtArgs>>): Prisma__UserDietaryClient<$Result.GetResult<Prisma.$UserDietaryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserDietaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDietaryCountArgs} args - Arguments to filter UserDietaries to count.
     * @example
     * // Count the number of UserDietaries
     * const count = await prisma.userDietary.count({
     *   where: {
     *     // ... the filter for the UserDietaries we want to count
     *   }
     * })
    **/
    count<T extends UserDietaryCountArgs>(
      args?: Subset<T, UserDietaryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserDietaryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserDietary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDietaryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserDietaryAggregateArgs>(args: Subset<T, UserDietaryAggregateArgs>): Prisma.PrismaPromise<GetUserDietaryAggregateType<T>>

    /**
     * Group by UserDietary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDietaryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserDietaryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserDietaryGroupByArgs['orderBy'] }
        : { orderBy?: UserDietaryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserDietaryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserDietaryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserDietary model
   */
  readonly fields: UserDietaryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserDietary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserDietaryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    dietary<T extends DietaryRestrictionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DietaryRestrictionDefaultArgs<ExtArgs>>): Prisma__DietaryRestrictionClient<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserDietary model
   */
  interface UserDietaryFieldRefs {
    readonly userId: FieldRef<"UserDietary", 'Int'>
    readonly dietaryId: FieldRef<"UserDietary", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * UserDietary findUnique
   */
  export type UserDietaryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDietary
     */
    select?: UserDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDietary
     */
    omit?: UserDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDietaryInclude<ExtArgs> | null
    /**
     * Filter, which UserDietary to fetch.
     */
    where: UserDietaryWhereUniqueInput
  }

  /**
   * UserDietary findUniqueOrThrow
   */
  export type UserDietaryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDietary
     */
    select?: UserDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDietary
     */
    omit?: UserDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDietaryInclude<ExtArgs> | null
    /**
     * Filter, which UserDietary to fetch.
     */
    where: UserDietaryWhereUniqueInput
  }

  /**
   * UserDietary findFirst
   */
  export type UserDietaryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDietary
     */
    select?: UserDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDietary
     */
    omit?: UserDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDietaryInclude<ExtArgs> | null
    /**
     * Filter, which UserDietary to fetch.
     */
    where?: UserDietaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDietaries to fetch.
     */
    orderBy?: UserDietaryOrderByWithRelationInput | UserDietaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserDietaries.
     */
    cursor?: UserDietaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDietaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDietaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDietaries.
     */
    distinct?: UserDietaryScalarFieldEnum | UserDietaryScalarFieldEnum[]
  }

  /**
   * UserDietary findFirstOrThrow
   */
  export type UserDietaryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDietary
     */
    select?: UserDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDietary
     */
    omit?: UserDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDietaryInclude<ExtArgs> | null
    /**
     * Filter, which UserDietary to fetch.
     */
    where?: UserDietaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDietaries to fetch.
     */
    orderBy?: UserDietaryOrderByWithRelationInput | UserDietaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserDietaries.
     */
    cursor?: UserDietaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDietaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDietaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDietaries.
     */
    distinct?: UserDietaryScalarFieldEnum | UserDietaryScalarFieldEnum[]
  }

  /**
   * UserDietary findMany
   */
  export type UserDietaryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDietary
     */
    select?: UserDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDietary
     */
    omit?: UserDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDietaryInclude<ExtArgs> | null
    /**
     * Filter, which UserDietaries to fetch.
     */
    where?: UserDietaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDietaries to fetch.
     */
    orderBy?: UserDietaryOrderByWithRelationInput | UserDietaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserDietaries.
     */
    cursor?: UserDietaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDietaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDietaries.
     */
    skip?: number
    distinct?: UserDietaryScalarFieldEnum | UserDietaryScalarFieldEnum[]
  }

  /**
   * UserDietary create
   */
  export type UserDietaryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDietary
     */
    select?: UserDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDietary
     */
    omit?: UserDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDietaryInclude<ExtArgs> | null
    /**
     * The data needed to create a UserDietary.
     */
    data: XOR<UserDietaryCreateInput, UserDietaryUncheckedCreateInput>
  }

  /**
   * UserDietary createMany
   */
  export type UserDietaryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserDietaries.
     */
    data: UserDietaryCreateManyInput | UserDietaryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserDietary createManyAndReturn
   */
  export type UserDietaryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDietary
     */
    select?: UserDietarySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserDietary
     */
    omit?: UserDietaryOmit<ExtArgs> | null
    /**
     * The data used to create many UserDietaries.
     */
    data: UserDietaryCreateManyInput | UserDietaryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDietaryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserDietary update
   */
  export type UserDietaryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDietary
     */
    select?: UserDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDietary
     */
    omit?: UserDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDietaryInclude<ExtArgs> | null
    /**
     * The data needed to update a UserDietary.
     */
    data: XOR<UserDietaryUpdateInput, UserDietaryUncheckedUpdateInput>
    /**
     * Choose, which UserDietary to update.
     */
    where: UserDietaryWhereUniqueInput
  }

  /**
   * UserDietary updateMany
   */
  export type UserDietaryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserDietaries.
     */
    data: XOR<UserDietaryUpdateManyMutationInput, UserDietaryUncheckedUpdateManyInput>
    /**
     * Filter which UserDietaries to update
     */
    where?: UserDietaryWhereInput
    /**
     * Limit how many UserDietaries to update.
     */
    limit?: number
  }

  /**
   * UserDietary updateManyAndReturn
   */
  export type UserDietaryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDietary
     */
    select?: UserDietarySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserDietary
     */
    omit?: UserDietaryOmit<ExtArgs> | null
    /**
     * The data used to update UserDietaries.
     */
    data: XOR<UserDietaryUpdateManyMutationInput, UserDietaryUncheckedUpdateManyInput>
    /**
     * Filter which UserDietaries to update
     */
    where?: UserDietaryWhereInput
    /**
     * Limit how many UserDietaries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDietaryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserDietary upsert
   */
  export type UserDietaryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDietary
     */
    select?: UserDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDietary
     */
    omit?: UserDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDietaryInclude<ExtArgs> | null
    /**
     * The filter to search for the UserDietary to update in case it exists.
     */
    where: UserDietaryWhereUniqueInput
    /**
     * In case the UserDietary found by the `where` argument doesn't exist, create a new UserDietary with this data.
     */
    create: XOR<UserDietaryCreateInput, UserDietaryUncheckedCreateInput>
    /**
     * In case the UserDietary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserDietaryUpdateInput, UserDietaryUncheckedUpdateInput>
  }

  /**
   * UserDietary delete
   */
  export type UserDietaryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDietary
     */
    select?: UserDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDietary
     */
    omit?: UserDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDietaryInclude<ExtArgs> | null
    /**
     * Filter which UserDietary to delete.
     */
    where: UserDietaryWhereUniqueInput
  }

  /**
   * UserDietary deleteMany
   */
  export type UserDietaryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserDietaries to delete
     */
    where?: UserDietaryWhereInput
    /**
     * Limit how many UserDietaries to delete.
     */
    limit?: number
  }

  /**
   * UserDietary without action
   */
  export type UserDietaryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDietary
     */
    select?: UserDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDietary
     */
    omit?: UserDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDietaryInclude<ExtArgs> | null
  }


  /**
   * Model Restaurant
   */

  export type AggregateRestaurant = {
    _count: RestaurantCountAggregateOutputType | null
    _avg: RestaurantAvgAggregateOutputType | null
    _sum: RestaurantSumAggregateOutputType | null
    _min: RestaurantMinAggregateOutputType | null
    _max: RestaurantMaxAggregateOutputType | null
  }

  export type RestaurantAvgAggregateOutputType = {
    id: number | null
    latitude: number | null
    longitude: number | null
  }

  export type RestaurantSumAggregateOutputType = {
    id: number | null
    latitude: number | null
    longitude: number | null
  }

  export type RestaurantMinAggregateOutputType = {
    id: number | null
    name: string | null
    address: string | null
    latitude: number | null
    longitude: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RestaurantMaxAggregateOutputType = {
    id: number | null
    name: string | null
    address: string | null
    latitude: number | null
    longitude: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RestaurantCountAggregateOutputType = {
    id: number
    name: number
    address: number
    latitude: number
    longitude: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RestaurantAvgAggregateInputType = {
    id?: true
    latitude?: true
    longitude?: true
  }

  export type RestaurantSumAggregateInputType = {
    id?: true
    latitude?: true
    longitude?: true
  }

  export type RestaurantMinAggregateInputType = {
    id?: true
    name?: true
    address?: true
    latitude?: true
    longitude?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RestaurantMaxAggregateInputType = {
    id?: true
    name?: true
    address?: true
    latitude?: true
    longitude?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RestaurantCountAggregateInputType = {
    id?: true
    name?: true
    address?: true
    latitude?: true
    longitude?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RestaurantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Restaurant to aggregate.
     */
    where?: RestaurantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: RestaurantOrderByWithRelationInput | RestaurantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RestaurantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Restaurants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Restaurants
    **/
    _count?: true | RestaurantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RestaurantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RestaurantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RestaurantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RestaurantMaxAggregateInputType
  }

  export type GetRestaurantAggregateType<T extends RestaurantAggregateArgs> = {
        [P in keyof T & keyof AggregateRestaurant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRestaurant[P]>
      : GetScalarType<T[P], AggregateRestaurant[P]>
  }




  export type RestaurantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RestaurantWhereInput
    orderBy?: RestaurantOrderByWithAggregationInput | RestaurantOrderByWithAggregationInput[]
    by: RestaurantScalarFieldEnum[] | RestaurantScalarFieldEnum
    having?: RestaurantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RestaurantCountAggregateInputType | true
    _avg?: RestaurantAvgAggregateInputType
    _sum?: RestaurantSumAggregateInputType
    _min?: RestaurantMinAggregateInputType
    _max?: RestaurantMaxAggregateInputType
  }

  export type RestaurantGroupByOutputType = {
    id: number
    name: string
    address: string
    latitude: number | null
    longitude: number | null
    createdAt: Date
    updatedAt: Date
    _count: RestaurantCountAggregateOutputType | null
    _avg: RestaurantAvgAggregateOutputType | null
    _sum: RestaurantSumAggregateOutputType | null
    _min: RestaurantMinAggregateOutputType | null
    _max: RestaurantMaxAggregateOutputType | null
  }

  type GetRestaurantGroupByPayload<T extends RestaurantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RestaurantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RestaurantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RestaurantGroupByOutputType[P]>
            : GetScalarType<T[P], RestaurantGroupByOutputType[P]>
        }
      >
    >


  export type RestaurantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dishes?: boolean | Restaurant$dishesArgs<ExtArgs>
    restaurantCuisines?: boolean | Restaurant$restaurantCuisinesArgs<ExtArgs>
    restaurantReviews?: boolean | Restaurant$restaurantReviewsArgs<ExtArgs>
    _count?: boolean | RestaurantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["restaurant"]>

  export type RestaurantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["restaurant"]>

  export type RestaurantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    address?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["restaurant"]>

  export type RestaurantSelectScalar = {
    id?: boolean
    name?: boolean
    address?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RestaurantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "address" | "latitude" | "longitude" | "createdAt" | "updatedAt", ExtArgs["result"]["restaurant"]>
  export type RestaurantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dishes?: boolean | Restaurant$dishesArgs<ExtArgs>
    restaurantCuisines?: boolean | Restaurant$restaurantCuisinesArgs<ExtArgs>
    restaurantReviews?: boolean | Restaurant$restaurantReviewsArgs<ExtArgs>
    _count?: boolean | RestaurantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RestaurantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RestaurantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RestaurantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Restaurant"
    objects: {
      dishes: Prisma.$DishPayload<ExtArgs>[]
      restaurantCuisines: Prisma.$RestaurantCuisinePayload<ExtArgs>[]
      restaurantReviews: Prisma.$RestaurantReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      address: string
      latitude: number | null
      longitude: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["restaurant"]>
    composites: {}
  }

  type RestaurantGetPayload<S extends boolean | null | undefined | RestaurantDefaultArgs> = $Result.GetResult<Prisma.$RestaurantPayload, S>

  type RestaurantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RestaurantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RestaurantCountAggregateInputType | true
    }

  export interface RestaurantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Restaurant'], meta: { name: 'Restaurant' } }
    /**
     * Find zero or one Restaurant that matches the filter.
     * @param {RestaurantFindUniqueArgs} args - Arguments to find a Restaurant
     * @example
     * // Get one Restaurant
     * const restaurant = await prisma.restaurant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RestaurantFindUniqueArgs>(args: SelectSubset<T, RestaurantFindUniqueArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Restaurant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RestaurantFindUniqueOrThrowArgs} args - Arguments to find a Restaurant
     * @example
     * // Get one Restaurant
     * const restaurant = await prisma.restaurant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RestaurantFindUniqueOrThrowArgs>(args: SelectSubset<T, RestaurantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Restaurant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantFindFirstArgs} args - Arguments to find a Restaurant
     * @example
     * // Get one Restaurant
     * const restaurant = await prisma.restaurant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RestaurantFindFirstArgs>(args?: SelectSubset<T, RestaurantFindFirstArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Restaurant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantFindFirstOrThrowArgs} args - Arguments to find a Restaurant
     * @example
     * // Get one Restaurant
     * const restaurant = await prisma.restaurant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RestaurantFindFirstOrThrowArgs>(args?: SelectSubset<T, RestaurantFindFirstOrThrowArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Restaurants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Restaurants
     * const restaurants = await prisma.restaurant.findMany()
     * 
     * // Get first 10 Restaurants
     * const restaurants = await prisma.restaurant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const restaurantWithIdOnly = await prisma.restaurant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RestaurantFindManyArgs>(args?: SelectSubset<T, RestaurantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Restaurant.
     * @param {RestaurantCreateArgs} args - Arguments to create a Restaurant.
     * @example
     * // Create one Restaurant
     * const Restaurant = await prisma.restaurant.create({
     *   data: {
     *     // ... data to create a Restaurant
     *   }
     * })
     * 
     */
    create<T extends RestaurantCreateArgs>(args: SelectSubset<T, RestaurantCreateArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Restaurants.
     * @param {RestaurantCreateManyArgs} args - Arguments to create many Restaurants.
     * @example
     * // Create many Restaurants
     * const restaurant = await prisma.restaurant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RestaurantCreateManyArgs>(args?: SelectSubset<T, RestaurantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Restaurants and returns the data saved in the database.
     * @param {RestaurantCreateManyAndReturnArgs} args - Arguments to create many Restaurants.
     * @example
     * // Create many Restaurants
     * const restaurant = await prisma.restaurant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Restaurants and only return the `id`
     * const restaurantWithIdOnly = await prisma.restaurant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RestaurantCreateManyAndReturnArgs>(args?: SelectSubset<T, RestaurantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Restaurant.
     * @param {RestaurantDeleteArgs} args - Arguments to delete one Restaurant.
     * @example
     * // Delete one Restaurant
     * const Restaurant = await prisma.restaurant.delete({
     *   where: {
     *     // ... filter to delete one Restaurant
     *   }
     * })
     * 
     */
    delete<T extends RestaurantDeleteArgs>(args: SelectSubset<T, RestaurantDeleteArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Restaurant.
     * @param {RestaurantUpdateArgs} args - Arguments to update one Restaurant.
     * @example
     * // Update one Restaurant
     * const restaurant = await prisma.restaurant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RestaurantUpdateArgs>(args: SelectSubset<T, RestaurantUpdateArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Restaurants.
     * @param {RestaurantDeleteManyArgs} args - Arguments to filter Restaurants to delete.
     * @example
     * // Delete a few Restaurants
     * const { count } = await prisma.restaurant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RestaurantDeleteManyArgs>(args?: SelectSubset<T, RestaurantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Restaurants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Restaurants
     * const restaurant = await prisma.restaurant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RestaurantUpdateManyArgs>(args: SelectSubset<T, RestaurantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Restaurants and returns the data updated in the database.
     * @param {RestaurantUpdateManyAndReturnArgs} args - Arguments to update many Restaurants.
     * @example
     * // Update many Restaurants
     * const restaurant = await prisma.restaurant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Restaurants and only return the `id`
     * const restaurantWithIdOnly = await prisma.restaurant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RestaurantUpdateManyAndReturnArgs>(args: SelectSubset<T, RestaurantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Restaurant.
     * @param {RestaurantUpsertArgs} args - Arguments to update or create a Restaurant.
     * @example
     * // Update or create a Restaurant
     * const restaurant = await prisma.restaurant.upsert({
     *   create: {
     *     // ... data to create a Restaurant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Restaurant we want to update
     *   }
     * })
     */
    upsert<T extends RestaurantUpsertArgs>(args: SelectSubset<T, RestaurantUpsertArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Restaurants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantCountArgs} args - Arguments to filter Restaurants to count.
     * @example
     * // Count the number of Restaurants
     * const count = await prisma.restaurant.count({
     *   where: {
     *     // ... the filter for the Restaurants we want to count
     *   }
     * })
    **/
    count<T extends RestaurantCountArgs>(
      args?: Subset<T, RestaurantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RestaurantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Restaurant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RestaurantAggregateArgs>(args: Subset<T, RestaurantAggregateArgs>): Prisma.PrismaPromise<GetRestaurantAggregateType<T>>

    /**
     * Group by Restaurant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RestaurantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RestaurantGroupByArgs['orderBy'] }
        : { orderBy?: RestaurantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RestaurantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRestaurantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Restaurant model
   */
  readonly fields: RestaurantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Restaurant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RestaurantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dishes<T extends Restaurant$dishesArgs<ExtArgs> = {}>(args?: Subset<T, Restaurant$dishesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DishPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    restaurantCuisines<T extends Restaurant$restaurantCuisinesArgs<ExtArgs> = {}>(args?: Subset<T, Restaurant$restaurantCuisinesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantCuisinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    restaurantReviews<T extends Restaurant$restaurantReviewsArgs<ExtArgs> = {}>(args?: Subset<T, Restaurant$restaurantReviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Restaurant model
   */
  interface RestaurantFieldRefs {
    readonly id: FieldRef<"Restaurant", 'Int'>
    readonly name: FieldRef<"Restaurant", 'String'>
    readonly address: FieldRef<"Restaurant", 'String'>
    readonly latitude: FieldRef<"Restaurant", 'Float'>
    readonly longitude: FieldRef<"Restaurant", 'Float'>
    readonly createdAt: FieldRef<"Restaurant", 'DateTime'>
    readonly updatedAt: FieldRef<"Restaurant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Restaurant findUnique
   */
  export type RestaurantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
    /**
     * Filter, which Restaurant to fetch.
     */
    where: RestaurantWhereUniqueInput
  }

  /**
   * Restaurant findUniqueOrThrow
   */
  export type RestaurantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
    /**
     * Filter, which Restaurant to fetch.
     */
    where: RestaurantWhereUniqueInput
  }

  /**
   * Restaurant findFirst
   */
  export type RestaurantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
    /**
     * Filter, which Restaurant to fetch.
     */
    where?: RestaurantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: RestaurantOrderByWithRelationInput | RestaurantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Restaurants.
     */
    cursor?: RestaurantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Restaurants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Restaurants.
     */
    distinct?: RestaurantScalarFieldEnum | RestaurantScalarFieldEnum[]
  }

  /**
   * Restaurant findFirstOrThrow
   */
  export type RestaurantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
    /**
     * Filter, which Restaurant to fetch.
     */
    where?: RestaurantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: RestaurantOrderByWithRelationInput | RestaurantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Restaurants.
     */
    cursor?: RestaurantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Restaurants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Restaurants.
     */
    distinct?: RestaurantScalarFieldEnum | RestaurantScalarFieldEnum[]
  }

  /**
   * Restaurant findMany
   */
  export type RestaurantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
    /**
     * Filter, which Restaurants to fetch.
     */
    where?: RestaurantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: RestaurantOrderByWithRelationInput | RestaurantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Restaurants.
     */
    cursor?: RestaurantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Restaurants.
     */
    skip?: number
    distinct?: RestaurantScalarFieldEnum | RestaurantScalarFieldEnum[]
  }

  /**
   * Restaurant create
   */
  export type RestaurantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
    /**
     * The data needed to create a Restaurant.
     */
    data: XOR<RestaurantCreateInput, RestaurantUncheckedCreateInput>
  }

  /**
   * Restaurant createMany
   */
  export type RestaurantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Restaurants.
     */
    data: RestaurantCreateManyInput | RestaurantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Restaurant createManyAndReturn
   */
  export type RestaurantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * The data used to create many Restaurants.
     */
    data: RestaurantCreateManyInput | RestaurantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Restaurant update
   */
  export type RestaurantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
    /**
     * The data needed to update a Restaurant.
     */
    data: XOR<RestaurantUpdateInput, RestaurantUncheckedUpdateInput>
    /**
     * Choose, which Restaurant to update.
     */
    where: RestaurantWhereUniqueInput
  }

  /**
   * Restaurant updateMany
   */
  export type RestaurantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Restaurants.
     */
    data: XOR<RestaurantUpdateManyMutationInput, RestaurantUncheckedUpdateManyInput>
    /**
     * Filter which Restaurants to update
     */
    where?: RestaurantWhereInput
    /**
     * Limit how many Restaurants to update.
     */
    limit?: number
  }

  /**
   * Restaurant updateManyAndReturn
   */
  export type RestaurantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * The data used to update Restaurants.
     */
    data: XOR<RestaurantUpdateManyMutationInput, RestaurantUncheckedUpdateManyInput>
    /**
     * Filter which Restaurants to update
     */
    where?: RestaurantWhereInput
    /**
     * Limit how many Restaurants to update.
     */
    limit?: number
  }

  /**
   * Restaurant upsert
   */
  export type RestaurantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
    /**
     * The filter to search for the Restaurant to update in case it exists.
     */
    where: RestaurantWhereUniqueInput
    /**
     * In case the Restaurant found by the `where` argument doesn't exist, create a new Restaurant with this data.
     */
    create: XOR<RestaurantCreateInput, RestaurantUncheckedCreateInput>
    /**
     * In case the Restaurant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RestaurantUpdateInput, RestaurantUncheckedUpdateInput>
  }

  /**
   * Restaurant delete
   */
  export type RestaurantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
    /**
     * Filter which Restaurant to delete.
     */
    where: RestaurantWhereUniqueInput
  }

  /**
   * Restaurant deleteMany
   */
  export type RestaurantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Restaurants to delete
     */
    where?: RestaurantWhereInput
    /**
     * Limit how many Restaurants to delete.
     */
    limit?: number
  }

  /**
   * Restaurant.dishes
   */
  export type Restaurant$dishesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dish
     */
    select?: DishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dish
     */
    omit?: DishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishInclude<ExtArgs> | null
    where?: DishWhereInput
    orderBy?: DishOrderByWithRelationInput | DishOrderByWithRelationInput[]
    cursor?: DishWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DishScalarFieldEnum | DishScalarFieldEnum[]
  }

  /**
   * Restaurant.restaurantCuisines
   */
  export type Restaurant$restaurantCuisinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantCuisine
     */
    select?: RestaurantCuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantCuisine
     */
    omit?: RestaurantCuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantCuisineInclude<ExtArgs> | null
    where?: RestaurantCuisineWhereInput
    orderBy?: RestaurantCuisineOrderByWithRelationInput | RestaurantCuisineOrderByWithRelationInput[]
    cursor?: RestaurantCuisineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RestaurantCuisineScalarFieldEnum | RestaurantCuisineScalarFieldEnum[]
  }

  /**
   * Restaurant.restaurantReviews
   */
  export type Restaurant$restaurantReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantReview
     */
    select?: RestaurantReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantReview
     */
    omit?: RestaurantReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantReviewInclude<ExtArgs> | null
    where?: RestaurantReviewWhereInput
    orderBy?: RestaurantReviewOrderByWithRelationInput | RestaurantReviewOrderByWithRelationInput[]
    cursor?: RestaurantReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RestaurantReviewScalarFieldEnum | RestaurantReviewScalarFieldEnum[]
  }

  /**
   * Restaurant without action
   */
  export type RestaurantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: RestaurantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: RestaurantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantInclude<ExtArgs> | null
  }


  /**
   * Model RestaurantReview
   */

  export type AggregateRestaurantReview = {
    _count: RestaurantReviewCountAggregateOutputType | null
    _avg: RestaurantReviewAvgAggregateOutputType | null
    _sum: RestaurantReviewSumAggregateOutputType | null
    _min: RestaurantReviewMinAggregateOutputType | null
    _max: RestaurantReviewMaxAggregateOutputType | null
  }

  export type RestaurantReviewAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    restaurantId: number | null
    rating: number | null
  }

  export type RestaurantReviewSumAggregateOutputType = {
    id: number | null
    userId: number | null
    restaurantId: number | null
    rating: number | null
  }

  export type RestaurantReviewMinAggregateOutputType = {
    id: number | null
    userId: number | null
    restaurantId: number | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RestaurantReviewMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    restaurantId: number | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RestaurantReviewCountAggregateOutputType = {
    id: number
    userId: number
    restaurantId: number
    rating: number
    comment: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RestaurantReviewAvgAggregateInputType = {
    id?: true
    userId?: true
    restaurantId?: true
    rating?: true
  }

  export type RestaurantReviewSumAggregateInputType = {
    id?: true
    userId?: true
    restaurantId?: true
    rating?: true
  }

  export type RestaurantReviewMinAggregateInputType = {
    id?: true
    userId?: true
    restaurantId?: true
    rating?: true
    comment?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RestaurantReviewMaxAggregateInputType = {
    id?: true
    userId?: true
    restaurantId?: true
    rating?: true
    comment?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RestaurantReviewCountAggregateInputType = {
    id?: true
    userId?: true
    restaurantId?: true
    rating?: true
    comment?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RestaurantReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RestaurantReview to aggregate.
     */
    where?: RestaurantReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestaurantReviews to fetch.
     */
    orderBy?: RestaurantReviewOrderByWithRelationInput | RestaurantReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RestaurantReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestaurantReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestaurantReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RestaurantReviews
    **/
    _count?: true | RestaurantReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RestaurantReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RestaurantReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RestaurantReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RestaurantReviewMaxAggregateInputType
  }

  export type GetRestaurantReviewAggregateType<T extends RestaurantReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateRestaurantReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRestaurantReview[P]>
      : GetScalarType<T[P], AggregateRestaurantReview[P]>
  }




  export type RestaurantReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RestaurantReviewWhereInput
    orderBy?: RestaurantReviewOrderByWithAggregationInput | RestaurantReviewOrderByWithAggregationInput[]
    by: RestaurantReviewScalarFieldEnum[] | RestaurantReviewScalarFieldEnum
    having?: RestaurantReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RestaurantReviewCountAggregateInputType | true
    _avg?: RestaurantReviewAvgAggregateInputType
    _sum?: RestaurantReviewSumAggregateInputType
    _min?: RestaurantReviewMinAggregateInputType
    _max?: RestaurantReviewMaxAggregateInputType
  }

  export type RestaurantReviewGroupByOutputType = {
    id: number
    userId: number
    restaurantId: number
    rating: number
    comment: string | null
    createdAt: Date
    updatedAt: Date
    _count: RestaurantReviewCountAggregateOutputType | null
    _avg: RestaurantReviewAvgAggregateOutputType | null
    _sum: RestaurantReviewSumAggregateOutputType | null
    _min: RestaurantReviewMinAggregateOutputType | null
    _max: RestaurantReviewMaxAggregateOutputType | null
  }

  type GetRestaurantReviewGroupByPayload<T extends RestaurantReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RestaurantReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RestaurantReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RestaurantReviewGroupByOutputType[P]>
            : GetScalarType<T[P], RestaurantReviewGroupByOutputType[P]>
        }
      >
    >


  export type RestaurantReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    restaurantId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["restaurantReview"]>

  export type RestaurantReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    restaurantId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["restaurantReview"]>

  export type RestaurantReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    restaurantId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["restaurantReview"]>

  export type RestaurantReviewSelectScalar = {
    id?: boolean
    userId?: boolean
    restaurantId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RestaurantReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "restaurantId" | "rating" | "comment" | "createdAt" | "updatedAt", ExtArgs["result"]["restaurantReview"]>
  export type RestaurantReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }
  export type RestaurantReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }
  export type RestaurantReviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
  }

  export type $RestaurantReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RestaurantReview"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      restaurant: Prisma.$RestaurantPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      restaurantId: number
      rating: number
      comment: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["restaurantReview"]>
    composites: {}
  }

  type RestaurantReviewGetPayload<S extends boolean | null | undefined | RestaurantReviewDefaultArgs> = $Result.GetResult<Prisma.$RestaurantReviewPayload, S>

  type RestaurantReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RestaurantReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RestaurantReviewCountAggregateInputType | true
    }

  export interface RestaurantReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RestaurantReview'], meta: { name: 'RestaurantReview' } }
    /**
     * Find zero or one RestaurantReview that matches the filter.
     * @param {RestaurantReviewFindUniqueArgs} args - Arguments to find a RestaurantReview
     * @example
     * // Get one RestaurantReview
     * const restaurantReview = await prisma.restaurantReview.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RestaurantReviewFindUniqueArgs>(args: SelectSubset<T, RestaurantReviewFindUniqueArgs<ExtArgs>>): Prisma__RestaurantReviewClient<$Result.GetResult<Prisma.$RestaurantReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RestaurantReview that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RestaurantReviewFindUniqueOrThrowArgs} args - Arguments to find a RestaurantReview
     * @example
     * // Get one RestaurantReview
     * const restaurantReview = await prisma.restaurantReview.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RestaurantReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, RestaurantReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RestaurantReviewClient<$Result.GetResult<Prisma.$RestaurantReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RestaurantReview that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantReviewFindFirstArgs} args - Arguments to find a RestaurantReview
     * @example
     * // Get one RestaurantReview
     * const restaurantReview = await prisma.restaurantReview.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RestaurantReviewFindFirstArgs>(args?: SelectSubset<T, RestaurantReviewFindFirstArgs<ExtArgs>>): Prisma__RestaurantReviewClient<$Result.GetResult<Prisma.$RestaurantReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RestaurantReview that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantReviewFindFirstOrThrowArgs} args - Arguments to find a RestaurantReview
     * @example
     * // Get one RestaurantReview
     * const restaurantReview = await prisma.restaurantReview.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RestaurantReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, RestaurantReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__RestaurantReviewClient<$Result.GetResult<Prisma.$RestaurantReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RestaurantReviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RestaurantReviews
     * const restaurantReviews = await prisma.restaurantReview.findMany()
     * 
     * // Get first 10 RestaurantReviews
     * const restaurantReviews = await prisma.restaurantReview.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const restaurantReviewWithIdOnly = await prisma.restaurantReview.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RestaurantReviewFindManyArgs>(args?: SelectSubset<T, RestaurantReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RestaurantReview.
     * @param {RestaurantReviewCreateArgs} args - Arguments to create a RestaurantReview.
     * @example
     * // Create one RestaurantReview
     * const RestaurantReview = await prisma.restaurantReview.create({
     *   data: {
     *     // ... data to create a RestaurantReview
     *   }
     * })
     * 
     */
    create<T extends RestaurantReviewCreateArgs>(args: SelectSubset<T, RestaurantReviewCreateArgs<ExtArgs>>): Prisma__RestaurantReviewClient<$Result.GetResult<Prisma.$RestaurantReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RestaurantReviews.
     * @param {RestaurantReviewCreateManyArgs} args - Arguments to create many RestaurantReviews.
     * @example
     * // Create many RestaurantReviews
     * const restaurantReview = await prisma.restaurantReview.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RestaurantReviewCreateManyArgs>(args?: SelectSubset<T, RestaurantReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RestaurantReviews and returns the data saved in the database.
     * @param {RestaurantReviewCreateManyAndReturnArgs} args - Arguments to create many RestaurantReviews.
     * @example
     * // Create many RestaurantReviews
     * const restaurantReview = await prisma.restaurantReview.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RestaurantReviews and only return the `id`
     * const restaurantReviewWithIdOnly = await prisma.restaurantReview.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RestaurantReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, RestaurantReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RestaurantReview.
     * @param {RestaurantReviewDeleteArgs} args - Arguments to delete one RestaurantReview.
     * @example
     * // Delete one RestaurantReview
     * const RestaurantReview = await prisma.restaurantReview.delete({
     *   where: {
     *     // ... filter to delete one RestaurantReview
     *   }
     * })
     * 
     */
    delete<T extends RestaurantReviewDeleteArgs>(args: SelectSubset<T, RestaurantReviewDeleteArgs<ExtArgs>>): Prisma__RestaurantReviewClient<$Result.GetResult<Prisma.$RestaurantReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RestaurantReview.
     * @param {RestaurantReviewUpdateArgs} args - Arguments to update one RestaurantReview.
     * @example
     * // Update one RestaurantReview
     * const restaurantReview = await prisma.restaurantReview.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RestaurantReviewUpdateArgs>(args: SelectSubset<T, RestaurantReviewUpdateArgs<ExtArgs>>): Prisma__RestaurantReviewClient<$Result.GetResult<Prisma.$RestaurantReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RestaurantReviews.
     * @param {RestaurantReviewDeleteManyArgs} args - Arguments to filter RestaurantReviews to delete.
     * @example
     * // Delete a few RestaurantReviews
     * const { count } = await prisma.restaurantReview.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RestaurantReviewDeleteManyArgs>(args?: SelectSubset<T, RestaurantReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RestaurantReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RestaurantReviews
     * const restaurantReview = await prisma.restaurantReview.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RestaurantReviewUpdateManyArgs>(args: SelectSubset<T, RestaurantReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RestaurantReviews and returns the data updated in the database.
     * @param {RestaurantReviewUpdateManyAndReturnArgs} args - Arguments to update many RestaurantReviews.
     * @example
     * // Update many RestaurantReviews
     * const restaurantReview = await prisma.restaurantReview.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RestaurantReviews and only return the `id`
     * const restaurantReviewWithIdOnly = await prisma.restaurantReview.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RestaurantReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, RestaurantReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RestaurantReview.
     * @param {RestaurantReviewUpsertArgs} args - Arguments to update or create a RestaurantReview.
     * @example
     * // Update or create a RestaurantReview
     * const restaurantReview = await prisma.restaurantReview.upsert({
     *   create: {
     *     // ... data to create a RestaurantReview
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RestaurantReview we want to update
     *   }
     * })
     */
    upsert<T extends RestaurantReviewUpsertArgs>(args: SelectSubset<T, RestaurantReviewUpsertArgs<ExtArgs>>): Prisma__RestaurantReviewClient<$Result.GetResult<Prisma.$RestaurantReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RestaurantReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantReviewCountArgs} args - Arguments to filter RestaurantReviews to count.
     * @example
     * // Count the number of RestaurantReviews
     * const count = await prisma.restaurantReview.count({
     *   where: {
     *     // ... the filter for the RestaurantReviews we want to count
     *   }
     * })
    **/
    count<T extends RestaurantReviewCountArgs>(
      args?: Subset<T, RestaurantReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RestaurantReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RestaurantReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RestaurantReviewAggregateArgs>(args: Subset<T, RestaurantReviewAggregateArgs>): Prisma.PrismaPromise<GetRestaurantReviewAggregateType<T>>

    /**
     * Group by RestaurantReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RestaurantReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RestaurantReviewGroupByArgs['orderBy'] }
        : { orderBy?: RestaurantReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RestaurantReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRestaurantReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RestaurantReview model
   */
  readonly fields: RestaurantReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RestaurantReview.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RestaurantReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    restaurant<T extends RestaurantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RestaurantDefaultArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RestaurantReview model
   */
  interface RestaurantReviewFieldRefs {
    readonly id: FieldRef<"RestaurantReview", 'Int'>
    readonly userId: FieldRef<"RestaurantReview", 'Int'>
    readonly restaurantId: FieldRef<"RestaurantReview", 'Int'>
    readonly rating: FieldRef<"RestaurantReview", 'Int'>
    readonly comment: FieldRef<"RestaurantReview", 'String'>
    readonly createdAt: FieldRef<"RestaurantReview", 'DateTime'>
    readonly updatedAt: FieldRef<"RestaurantReview", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RestaurantReview findUnique
   */
  export type RestaurantReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantReview
     */
    select?: RestaurantReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantReview
     */
    omit?: RestaurantReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantReviewInclude<ExtArgs> | null
    /**
     * Filter, which RestaurantReview to fetch.
     */
    where: RestaurantReviewWhereUniqueInput
  }

  /**
   * RestaurantReview findUniqueOrThrow
   */
  export type RestaurantReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantReview
     */
    select?: RestaurantReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantReview
     */
    omit?: RestaurantReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantReviewInclude<ExtArgs> | null
    /**
     * Filter, which RestaurantReview to fetch.
     */
    where: RestaurantReviewWhereUniqueInput
  }

  /**
   * RestaurantReview findFirst
   */
  export type RestaurantReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantReview
     */
    select?: RestaurantReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantReview
     */
    omit?: RestaurantReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantReviewInclude<ExtArgs> | null
    /**
     * Filter, which RestaurantReview to fetch.
     */
    where?: RestaurantReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestaurantReviews to fetch.
     */
    orderBy?: RestaurantReviewOrderByWithRelationInput | RestaurantReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RestaurantReviews.
     */
    cursor?: RestaurantReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestaurantReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestaurantReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RestaurantReviews.
     */
    distinct?: RestaurantReviewScalarFieldEnum | RestaurantReviewScalarFieldEnum[]
  }

  /**
   * RestaurantReview findFirstOrThrow
   */
  export type RestaurantReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantReview
     */
    select?: RestaurantReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantReview
     */
    omit?: RestaurantReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantReviewInclude<ExtArgs> | null
    /**
     * Filter, which RestaurantReview to fetch.
     */
    where?: RestaurantReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestaurantReviews to fetch.
     */
    orderBy?: RestaurantReviewOrderByWithRelationInput | RestaurantReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RestaurantReviews.
     */
    cursor?: RestaurantReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestaurantReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestaurantReviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RestaurantReviews.
     */
    distinct?: RestaurantReviewScalarFieldEnum | RestaurantReviewScalarFieldEnum[]
  }

  /**
   * RestaurantReview findMany
   */
  export type RestaurantReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantReview
     */
    select?: RestaurantReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantReview
     */
    omit?: RestaurantReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantReviewInclude<ExtArgs> | null
    /**
     * Filter, which RestaurantReviews to fetch.
     */
    where?: RestaurantReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestaurantReviews to fetch.
     */
    orderBy?: RestaurantReviewOrderByWithRelationInput | RestaurantReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RestaurantReviews.
     */
    cursor?: RestaurantReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestaurantReviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestaurantReviews.
     */
    skip?: number
    distinct?: RestaurantReviewScalarFieldEnum | RestaurantReviewScalarFieldEnum[]
  }

  /**
   * RestaurantReview create
   */
  export type RestaurantReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantReview
     */
    select?: RestaurantReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantReview
     */
    omit?: RestaurantReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a RestaurantReview.
     */
    data: XOR<RestaurantReviewCreateInput, RestaurantReviewUncheckedCreateInput>
  }

  /**
   * RestaurantReview createMany
   */
  export type RestaurantReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RestaurantReviews.
     */
    data: RestaurantReviewCreateManyInput | RestaurantReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RestaurantReview createManyAndReturn
   */
  export type RestaurantReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantReview
     */
    select?: RestaurantReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantReview
     */
    omit?: RestaurantReviewOmit<ExtArgs> | null
    /**
     * The data used to create many RestaurantReviews.
     */
    data: RestaurantReviewCreateManyInput | RestaurantReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RestaurantReview update
   */
  export type RestaurantReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantReview
     */
    select?: RestaurantReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantReview
     */
    omit?: RestaurantReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a RestaurantReview.
     */
    data: XOR<RestaurantReviewUpdateInput, RestaurantReviewUncheckedUpdateInput>
    /**
     * Choose, which RestaurantReview to update.
     */
    where: RestaurantReviewWhereUniqueInput
  }

  /**
   * RestaurantReview updateMany
   */
  export type RestaurantReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RestaurantReviews.
     */
    data: XOR<RestaurantReviewUpdateManyMutationInput, RestaurantReviewUncheckedUpdateManyInput>
    /**
     * Filter which RestaurantReviews to update
     */
    where?: RestaurantReviewWhereInput
    /**
     * Limit how many RestaurantReviews to update.
     */
    limit?: number
  }

  /**
   * RestaurantReview updateManyAndReturn
   */
  export type RestaurantReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantReview
     */
    select?: RestaurantReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantReview
     */
    omit?: RestaurantReviewOmit<ExtArgs> | null
    /**
     * The data used to update RestaurantReviews.
     */
    data: XOR<RestaurantReviewUpdateManyMutationInput, RestaurantReviewUncheckedUpdateManyInput>
    /**
     * Filter which RestaurantReviews to update
     */
    where?: RestaurantReviewWhereInput
    /**
     * Limit how many RestaurantReviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantReviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RestaurantReview upsert
   */
  export type RestaurantReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantReview
     */
    select?: RestaurantReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantReview
     */
    omit?: RestaurantReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the RestaurantReview to update in case it exists.
     */
    where: RestaurantReviewWhereUniqueInput
    /**
     * In case the RestaurantReview found by the `where` argument doesn't exist, create a new RestaurantReview with this data.
     */
    create: XOR<RestaurantReviewCreateInput, RestaurantReviewUncheckedCreateInput>
    /**
     * In case the RestaurantReview was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RestaurantReviewUpdateInput, RestaurantReviewUncheckedUpdateInput>
  }

  /**
   * RestaurantReview delete
   */
  export type RestaurantReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantReview
     */
    select?: RestaurantReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantReview
     */
    omit?: RestaurantReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantReviewInclude<ExtArgs> | null
    /**
     * Filter which RestaurantReview to delete.
     */
    where: RestaurantReviewWhereUniqueInput
  }

  /**
   * RestaurantReview deleteMany
   */
  export type RestaurantReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RestaurantReviews to delete
     */
    where?: RestaurantReviewWhereInput
    /**
     * Limit how many RestaurantReviews to delete.
     */
    limit?: number
  }

  /**
   * RestaurantReview without action
   */
  export type RestaurantReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantReview
     */
    select?: RestaurantReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantReview
     */
    omit?: RestaurantReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantReviewInclude<ExtArgs> | null
  }


  /**
   * Model Cuisine
   */

  export type AggregateCuisine = {
    _count: CuisineCountAggregateOutputType | null
    _avg: CuisineAvgAggregateOutputType | null
    _sum: CuisineSumAggregateOutputType | null
    _min: CuisineMinAggregateOutputType | null
    _max: CuisineMaxAggregateOutputType | null
  }

  export type CuisineAvgAggregateOutputType = {
    id: number | null
  }

  export type CuisineSumAggregateOutputType = {
    id: number | null
  }

  export type CuisineMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CuisineMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CuisineCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CuisineAvgAggregateInputType = {
    id?: true
  }

  export type CuisineSumAggregateInputType = {
    id?: true
  }

  export type CuisineMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CuisineMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CuisineCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CuisineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cuisine to aggregate.
     */
    where?: CuisineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cuisines to fetch.
     */
    orderBy?: CuisineOrderByWithRelationInput | CuisineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CuisineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cuisines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cuisines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cuisines
    **/
    _count?: true | CuisineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CuisineAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CuisineSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CuisineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CuisineMaxAggregateInputType
  }

  export type GetCuisineAggregateType<T extends CuisineAggregateArgs> = {
        [P in keyof T & keyof AggregateCuisine]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCuisine[P]>
      : GetScalarType<T[P], AggregateCuisine[P]>
  }




  export type CuisineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CuisineWhereInput
    orderBy?: CuisineOrderByWithAggregationInput | CuisineOrderByWithAggregationInput[]
    by: CuisineScalarFieldEnum[] | CuisineScalarFieldEnum
    having?: CuisineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CuisineCountAggregateInputType | true
    _avg?: CuisineAvgAggregateInputType
    _sum?: CuisineSumAggregateInputType
    _min?: CuisineMinAggregateInputType
    _max?: CuisineMaxAggregateInputType
  }

  export type CuisineGroupByOutputType = {
    id: number
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: CuisineCountAggregateOutputType | null
    _avg: CuisineAvgAggregateOutputType | null
    _sum: CuisineSumAggregateOutputType | null
    _min: CuisineMinAggregateOutputType | null
    _max: CuisineMaxAggregateOutputType | null
  }

  type GetCuisineGroupByPayload<T extends CuisineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CuisineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CuisineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CuisineGroupByOutputType[P]>
            : GetScalarType<T[P], CuisineGroupByOutputType[P]>
        }
      >
    >


  export type CuisineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    dishes?: boolean | Cuisine$dishesArgs<ExtArgs>
    restaurantCuisines?: boolean | Cuisine$restaurantCuisinesArgs<ExtArgs>
    _count?: boolean | CuisineCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cuisine"]>

  export type CuisineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cuisine"]>

  export type CuisineSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["cuisine"]>

  export type CuisineSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CuisineOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["cuisine"]>
  export type CuisineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dishes?: boolean | Cuisine$dishesArgs<ExtArgs>
    restaurantCuisines?: boolean | Cuisine$restaurantCuisinesArgs<ExtArgs>
    _count?: boolean | CuisineCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CuisineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CuisineIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CuisinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Cuisine"
    objects: {
      dishes: Prisma.$DishPayload<ExtArgs>[]
      restaurantCuisines: Prisma.$RestaurantCuisinePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["cuisine"]>
    composites: {}
  }

  type CuisineGetPayload<S extends boolean | null | undefined | CuisineDefaultArgs> = $Result.GetResult<Prisma.$CuisinePayload, S>

  type CuisineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CuisineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CuisineCountAggregateInputType | true
    }

  export interface CuisineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Cuisine'], meta: { name: 'Cuisine' } }
    /**
     * Find zero or one Cuisine that matches the filter.
     * @param {CuisineFindUniqueArgs} args - Arguments to find a Cuisine
     * @example
     * // Get one Cuisine
     * const cuisine = await prisma.cuisine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CuisineFindUniqueArgs>(args: SelectSubset<T, CuisineFindUniqueArgs<ExtArgs>>): Prisma__CuisineClient<$Result.GetResult<Prisma.$CuisinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Cuisine that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CuisineFindUniqueOrThrowArgs} args - Arguments to find a Cuisine
     * @example
     * // Get one Cuisine
     * const cuisine = await prisma.cuisine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CuisineFindUniqueOrThrowArgs>(args: SelectSubset<T, CuisineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CuisineClient<$Result.GetResult<Prisma.$CuisinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cuisine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CuisineFindFirstArgs} args - Arguments to find a Cuisine
     * @example
     * // Get one Cuisine
     * const cuisine = await prisma.cuisine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CuisineFindFirstArgs>(args?: SelectSubset<T, CuisineFindFirstArgs<ExtArgs>>): Prisma__CuisineClient<$Result.GetResult<Prisma.$CuisinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Cuisine that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CuisineFindFirstOrThrowArgs} args - Arguments to find a Cuisine
     * @example
     * // Get one Cuisine
     * const cuisine = await prisma.cuisine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CuisineFindFirstOrThrowArgs>(args?: SelectSubset<T, CuisineFindFirstOrThrowArgs<ExtArgs>>): Prisma__CuisineClient<$Result.GetResult<Prisma.$CuisinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Cuisines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CuisineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cuisines
     * const cuisines = await prisma.cuisine.findMany()
     * 
     * // Get first 10 Cuisines
     * const cuisines = await prisma.cuisine.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cuisineWithIdOnly = await prisma.cuisine.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CuisineFindManyArgs>(args?: SelectSubset<T, CuisineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CuisinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Cuisine.
     * @param {CuisineCreateArgs} args - Arguments to create a Cuisine.
     * @example
     * // Create one Cuisine
     * const Cuisine = await prisma.cuisine.create({
     *   data: {
     *     // ... data to create a Cuisine
     *   }
     * })
     * 
     */
    create<T extends CuisineCreateArgs>(args: SelectSubset<T, CuisineCreateArgs<ExtArgs>>): Prisma__CuisineClient<$Result.GetResult<Prisma.$CuisinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Cuisines.
     * @param {CuisineCreateManyArgs} args - Arguments to create many Cuisines.
     * @example
     * // Create many Cuisines
     * const cuisine = await prisma.cuisine.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CuisineCreateManyArgs>(args?: SelectSubset<T, CuisineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cuisines and returns the data saved in the database.
     * @param {CuisineCreateManyAndReturnArgs} args - Arguments to create many Cuisines.
     * @example
     * // Create many Cuisines
     * const cuisine = await prisma.cuisine.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cuisines and only return the `id`
     * const cuisineWithIdOnly = await prisma.cuisine.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CuisineCreateManyAndReturnArgs>(args?: SelectSubset<T, CuisineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CuisinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Cuisine.
     * @param {CuisineDeleteArgs} args - Arguments to delete one Cuisine.
     * @example
     * // Delete one Cuisine
     * const Cuisine = await prisma.cuisine.delete({
     *   where: {
     *     // ... filter to delete one Cuisine
     *   }
     * })
     * 
     */
    delete<T extends CuisineDeleteArgs>(args: SelectSubset<T, CuisineDeleteArgs<ExtArgs>>): Prisma__CuisineClient<$Result.GetResult<Prisma.$CuisinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Cuisine.
     * @param {CuisineUpdateArgs} args - Arguments to update one Cuisine.
     * @example
     * // Update one Cuisine
     * const cuisine = await prisma.cuisine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CuisineUpdateArgs>(args: SelectSubset<T, CuisineUpdateArgs<ExtArgs>>): Prisma__CuisineClient<$Result.GetResult<Prisma.$CuisinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Cuisines.
     * @param {CuisineDeleteManyArgs} args - Arguments to filter Cuisines to delete.
     * @example
     * // Delete a few Cuisines
     * const { count } = await prisma.cuisine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CuisineDeleteManyArgs>(args?: SelectSubset<T, CuisineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cuisines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CuisineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cuisines
     * const cuisine = await prisma.cuisine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CuisineUpdateManyArgs>(args: SelectSubset<T, CuisineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cuisines and returns the data updated in the database.
     * @param {CuisineUpdateManyAndReturnArgs} args - Arguments to update many Cuisines.
     * @example
     * // Update many Cuisines
     * const cuisine = await prisma.cuisine.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cuisines and only return the `id`
     * const cuisineWithIdOnly = await prisma.cuisine.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CuisineUpdateManyAndReturnArgs>(args: SelectSubset<T, CuisineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CuisinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Cuisine.
     * @param {CuisineUpsertArgs} args - Arguments to update or create a Cuisine.
     * @example
     * // Update or create a Cuisine
     * const cuisine = await prisma.cuisine.upsert({
     *   create: {
     *     // ... data to create a Cuisine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Cuisine we want to update
     *   }
     * })
     */
    upsert<T extends CuisineUpsertArgs>(args: SelectSubset<T, CuisineUpsertArgs<ExtArgs>>): Prisma__CuisineClient<$Result.GetResult<Prisma.$CuisinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Cuisines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CuisineCountArgs} args - Arguments to filter Cuisines to count.
     * @example
     * // Count the number of Cuisines
     * const count = await prisma.cuisine.count({
     *   where: {
     *     // ... the filter for the Cuisines we want to count
     *   }
     * })
    **/
    count<T extends CuisineCountArgs>(
      args?: Subset<T, CuisineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CuisineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Cuisine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CuisineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CuisineAggregateArgs>(args: Subset<T, CuisineAggregateArgs>): Prisma.PrismaPromise<GetCuisineAggregateType<T>>

    /**
     * Group by Cuisine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CuisineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CuisineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CuisineGroupByArgs['orderBy'] }
        : { orderBy?: CuisineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CuisineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCuisineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Cuisine model
   */
  readonly fields: CuisineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Cuisine.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CuisineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dishes<T extends Cuisine$dishesArgs<ExtArgs> = {}>(args?: Subset<T, Cuisine$dishesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DishPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    restaurantCuisines<T extends Cuisine$restaurantCuisinesArgs<ExtArgs> = {}>(args?: Subset<T, Cuisine$restaurantCuisinesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantCuisinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Cuisine model
   */
  interface CuisineFieldRefs {
    readonly id: FieldRef<"Cuisine", 'Int'>
    readonly name: FieldRef<"Cuisine", 'String'>
    readonly description: FieldRef<"Cuisine", 'String'>
    readonly createdAt: FieldRef<"Cuisine", 'DateTime'>
    readonly updatedAt: FieldRef<"Cuisine", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Cuisine findUnique
   */
  export type CuisineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cuisine
     */
    select?: CuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cuisine
     */
    omit?: CuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CuisineInclude<ExtArgs> | null
    /**
     * Filter, which Cuisine to fetch.
     */
    where: CuisineWhereUniqueInput
  }

  /**
   * Cuisine findUniqueOrThrow
   */
  export type CuisineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cuisine
     */
    select?: CuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cuisine
     */
    omit?: CuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CuisineInclude<ExtArgs> | null
    /**
     * Filter, which Cuisine to fetch.
     */
    where: CuisineWhereUniqueInput
  }

  /**
   * Cuisine findFirst
   */
  export type CuisineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cuisine
     */
    select?: CuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cuisine
     */
    omit?: CuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CuisineInclude<ExtArgs> | null
    /**
     * Filter, which Cuisine to fetch.
     */
    where?: CuisineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cuisines to fetch.
     */
    orderBy?: CuisineOrderByWithRelationInput | CuisineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cuisines.
     */
    cursor?: CuisineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cuisines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cuisines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cuisines.
     */
    distinct?: CuisineScalarFieldEnum | CuisineScalarFieldEnum[]
  }

  /**
   * Cuisine findFirstOrThrow
   */
  export type CuisineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cuisine
     */
    select?: CuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cuisine
     */
    omit?: CuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CuisineInclude<ExtArgs> | null
    /**
     * Filter, which Cuisine to fetch.
     */
    where?: CuisineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cuisines to fetch.
     */
    orderBy?: CuisineOrderByWithRelationInput | CuisineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cuisines.
     */
    cursor?: CuisineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cuisines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cuisines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cuisines.
     */
    distinct?: CuisineScalarFieldEnum | CuisineScalarFieldEnum[]
  }

  /**
   * Cuisine findMany
   */
  export type CuisineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cuisine
     */
    select?: CuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cuisine
     */
    omit?: CuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CuisineInclude<ExtArgs> | null
    /**
     * Filter, which Cuisines to fetch.
     */
    where?: CuisineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cuisines to fetch.
     */
    orderBy?: CuisineOrderByWithRelationInput | CuisineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cuisines.
     */
    cursor?: CuisineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cuisines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cuisines.
     */
    skip?: number
    distinct?: CuisineScalarFieldEnum | CuisineScalarFieldEnum[]
  }

  /**
   * Cuisine create
   */
  export type CuisineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cuisine
     */
    select?: CuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cuisine
     */
    omit?: CuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CuisineInclude<ExtArgs> | null
    /**
     * The data needed to create a Cuisine.
     */
    data: XOR<CuisineCreateInput, CuisineUncheckedCreateInput>
  }

  /**
   * Cuisine createMany
   */
  export type CuisineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cuisines.
     */
    data: CuisineCreateManyInput | CuisineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cuisine createManyAndReturn
   */
  export type CuisineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cuisine
     */
    select?: CuisineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cuisine
     */
    omit?: CuisineOmit<ExtArgs> | null
    /**
     * The data used to create many Cuisines.
     */
    data: CuisineCreateManyInput | CuisineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Cuisine update
   */
  export type CuisineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cuisine
     */
    select?: CuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cuisine
     */
    omit?: CuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CuisineInclude<ExtArgs> | null
    /**
     * The data needed to update a Cuisine.
     */
    data: XOR<CuisineUpdateInput, CuisineUncheckedUpdateInput>
    /**
     * Choose, which Cuisine to update.
     */
    where: CuisineWhereUniqueInput
  }

  /**
   * Cuisine updateMany
   */
  export type CuisineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cuisines.
     */
    data: XOR<CuisineUpdateManyMutationInput, CuisineUncheckedUpdateManyInput>
    /**
     * Filter which Cuisines to update
     */
    where?: CuisineWhereInput
    /**
     * Limit how many Cuisines to update.
     */
    limit?: number
  }

  /**
   * Cuisine updateManyAndReturn
   */
  export type CuisineUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cuisine
     */
    select?: CuisineSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Cuisine
     */
    omit?: CuisineOmit<ExtArgs> | null
    /**
     * The data used to update Cuisines.
     */
    data: XOR<CuisineUpdateManyMutationInput, CuisineUncheckedUpdateManyInput>
    /**
     * Filter which Cuisines to update
     */
    where?: CuisineWhereInput
    /**
     * Limit how many Cuisines to update.
     */
    limit?: number
  }

  /**
   * Cuisine upsert
   */
  export type CuisineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cuisine
     */
    select?: CuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cuisine
     */
    omit?: CuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CuisineInclude<ExtArgs> | null
    /**
     * The filter to search for the Cuisine to update in case it exists.
     */
    where: CuisineWhereUniqueInput
    /**
     * In case the Cuisine found by the `where` argument doesn't exist, create a new Cuisine with this data.
     */
    create: XOR<CuisineCreateInput, CuisineUncheckedCreateInput>
    /**
     * In case the Cuisine was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CuisineUpdateInput, CuisineUncheckedUpdateInput>
  }

  /**
   * Cuisine delete
   */
  export type CuisineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cuisine
     */
    select?: CuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cuisine
     */
    omit?: CuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CuisineInclude<ExtArgs> | null
    /**
     * Filter which Cuisine to delete.
     */
    where: CuisineWhereUniqueInput
  }

  /**
   * Cuisine deleteMany
   */
  export type CuisineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cuisines to delete
     */
    where?: CuisineWhereInput
    /**
     * Limit how many Cuisines to delete.
     */
    limit?: number
  }

  /**
   * Cuisine.dishes
   */
  export type Cuisine$dishesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dish
     */
    select?: DishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dish
     */
    omit?: DishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishInclude<ExtArgs> | null
    where?: DishWhereInput
    orderBy?: DishOrderByWithRelationInput | DishOrderByWithRelationInput[]
    cursor?: DishWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DishScalarFieldEnum | DishScalarFieldEnum[]
  }

  /**
   * Cuisine.restaurantCuisines
   */
  export type Cuisine$restaurantCuisinesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantCuisine
     */
    select?: RestaurantCuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantCuisine
     */
    omit?: RestaurantCuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantCuisineInclude<ExtArgs> | null
    where?: RestaurantCuisineWhereInput
    orderBy?: RestaurantCuisineOrderByWithRelationInput | RestaurantCuisineOrderByWithRelationInput[]
    cursor?: RestaurantCuisineWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RestaurantCuisineScalarFieldEnum | RestaurantCuisineScalarFieldEnum[]
  }

  /**
   * Cuisine without action
   */
  export type CuisineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cuisine
     */
    select?: CuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cuisine
     */
    omit?: CuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CuisineInclude<ExtArgs> | null
  }


  /**
   * Model RestaurantCuisine
   */

  export type AggregateRestaurantCuisine = {
    _count: RestaurantCuisineCountAggregateOutputType | null
    _avg: RestaurantCuisineAvgAggregateOutputType | null
    _sum: RestaurantCuisineSumAggregateOutputType | null
    _min: RestaurantCuisineMinAggregateOutputType | null
    _max: RestaurantCuisineMaxAggregateOutputType | null
  }

  export type RestaurantCuisineAvgAggregateOutputType = {
    restaurantId: number | null
    cuisineId: number | null
  }

  export type RestaurantCuisineSumAggregateOutputType = {
    restaurantId: number | null
    cuisineId: number | null
  }

  export type RestaurantCuisineMinAggregateOutputType = {
    restaurantId: number | null
    cuisineId: number | null
  }

  export type RestaurantCuisineMaxAggregateOutputType = {
    restaurantId: number | null
    cuisineId: number | null
  }

  export type RestaurantCuisineCountAggregateOutputType = {
    restaurantId: number
    cuisineId: number
    _all: number
  }


  export type RestaurantCuisineAvgAggregateInputType = {
    restaurantId?: true
    cuisineId?: true
  }

  export type RestaurantCuisineSumAggregateInputType = {
    restaurantId?: true
    cuisineId?: true
  }

  export type RestaurantCuisineMinAggregateInputType = {
    restaurantId?: true
    cuisineId?: true
  }

  export type RestaurantCuisineMaxAggregateInputType = {
    restaurantId?: true
    cuisineId?: true
  }

  export type RestaurantCuisineCountAggregateInputType = {
    restaurantId?: true
    cuisineId?: true
    _all?: true
  }

  export type RestaurantCuisineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RestaurantCuisine to aggregate.
     */
    where?: RestaurantCuisineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestaurantCuisines to fetch.
     */
    orderBy?: RestaurantCuisineOrderByWithRelationInput | RestaurantCuisineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RestaurantCuisineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestaurantCuisines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestaurantCuisines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RestaurantCuisines
    **/
    _count?: true | RestaurantCuisineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RestaurantCuisineAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RestaurantCuisineSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RestaurantCuisineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RestaurantCuisineMaxAggregateInputType
  }

  export type GetRestaurantCuisineAggregateType<T extends RestaurantCuisineAggregateArgs> = {
        [P in keyof T & keyof AggregateRestaurantCuisine]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRestaurantCuisine[P]>
      : GetScalarType<T[P], AggregateRestaurantCuisine[P]>
  }




  export type RestaurantCuisineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RestaurantCuisineWhereInput
    orderBy?: RestaurantCuisineOrderByWithAggregationInput | RestaurantCuisineOrderByWithAggregationInput[]
    by: RestaurantCuisineScalarFieldEnum[] | RestaurantCuisineScalarFieldEnum
    having?: RestaurantCuisineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RestaurantCuisineCountAggregateInputType | true
    _avg?: RestaurantCuisineAvgAggregateInputType
    _sum?: RestaurantCuisineSumAggregateInputType
    _min?: RestaurantCuisineMinAggregateInputType
    _max?: RestaurantCuisineMaxAggregateInputType
  }

  export type RestaurantCuisineGroupByOutputType = {
    restaurantId: number
    cuisineId: number
    _count: RestaurantCuisineCountAggregateOutputType | null
    _avg: RestaurantCuisineAvgAggregateOutputType | null
    _sum: RestaurantCuisineSumAggregateOutputType | null
    _min: RestaurantCuisineMinAggregateOutputType | null
    _max: RestaurantCuisineMaxAggregateOutputType | null
  }

  type GetRestaurantCuisineGroupByPayload<T extends RestaurantCuisineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RestaurantCuisineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RestaurantCuisineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RestaurantCuisineGroupByOutputType[P]>
            : GetScalarType<T[P], RestaurantCuisineGroupByOutputType[P]>
        }
      >
    >


  export type RestaurantCuisineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    restaurantId?: boolean
    cuisineId?: boolean
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    cuisine?: boolean | CuisineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["restaurantCuisine"]>

  export type RestaurantCuisineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    restaurantId?: boolean
    cuisineId?: boolean
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    cuisine?: boolean | CuisineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["restaurantCuisine"]>

  export type RestaurantCuisineSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    restaurantId?: boolean
    cuisineId?: boolean
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    cuisine?: boolean | CuisineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["restaurantCuisine"]>

  export type RestaurantCuisineSelectScalar = {
    restaurantId?: boolean
    cuisineId?: boolean
  }

  export type RestaurantCuisineOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"restaurantId" | "cuisineId", ExtArgs["result"]["restaurantCuisine"]>
  export type RestaurantCuisineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    cuisine?: boolean | CuisineDefaultArgs<ExtArgs>
  }
  export type RestaurantCuisineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    cuisine?: boolean | CuisineDefaultArgs<ExtArgs>
  }
  export type RestaurantCuisineIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    cuisine?: boolean | CuisineDefaultArgs<ExtArgs>
  }

  export type $RestaurantCuisinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RestaurantCuisine"
    objects: {
      restaurant: Prisma.$RestaurantPayload<ExtArgs>
      cuisine: Prisma.$CuisinePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      restaurantId: number
      cuisineId: number
    }, ExtArgs["result"]["restaurantCuisine"]>
    composites: {}
  }

  type RestaurantCuisineGetPayload<S extends boolean | null | undefined | RestaurantCuisineDefaultArgs> = $Result.GetResult<Prisma.$RestaurantCuisinePayload, S>

  type RestaurantCuisineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RestaurantCuisineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RestaurantCuisineCountAggregateInputType | true
    }

  export interface RestaurantCuisineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RestaurantCuisine'], meta: { name: 'RestaurantCuisine' } }
    /**
     * Find zero or one RestaurantCuisine that matches the filter.
     * @param {RestaurantCuisineFindUniqueArgs} args - Arguments to find a RestaurantCuisine
     * @example
     * // Get one RestaurantCuisine
     * const restaurantCuisine = await prisma.restaurantCuisine.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RestaurantCuisineFindUniqueArgs>(args: SelectSubset<T, RestaurantCuisineFindUniqueArgs<ExtArgs>>): Prisma__RestaurantCuisineClient<$Result.GetResult<Prisma.$RestaurantCuisinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RestaurantCuisine that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RestaurantCuisineFindUniqueOrThrowArgs} args - Arguments to find a RestaurantCuisine
     * @example
     * // Get one RestaurantCuisine
     * const restaurantCuisine = await prisma.restaurantCuisine.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RestaurantCuisineFindUniqueOrThrowArgs>(args: SelectSubset<T, RestaurantCuisineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RestaurantCuisineClient<$Result.GetResult<Prisma.$RestaurantCuisinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RestaurantCuisine that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantCuisineFindFirstArgs} args - Arguments to find a RestaurantCuisine
     * @example
     * // Get one RestaurantCuisine
     * const restaurantCuisine = await prisma.restaurantCuisine.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RestaurantCuisineFindFirstArgs>(args?: SelectSubset<T, RestaurantCuisineFindFirstArgs<ExtArgs>>): Prisma__RestaurantCuisineClient<$Result.GetResult<Prisma.$RestaurantCuisinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RestaurantCuisine that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantCuisineFindFirstOrThrowArgs} args - Arguments to find a RestaurantCuisine
     * @example
     * // Get one RestaurantCuisine
     * const restaurantCuisine = await prisma.restaurantCuisine.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RestaurantCuisineFindFirstOrThrowArgs>(args?: SelectSubset<T, RestaurantCuisineFindFirstOrThrowArgs<ExtArgs>>): Prisma__RestaurantCuisineClient<$Result.GetResult<Prisma.$RestaurantCuisinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RestaurantCuisines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantCuisineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RestaurantCuisines
     * const restaurantCuisines = await prisma.restaurantCuisine.findMany()
     * 
     * // Get first 10 RestaurantCuisines
     * const restaurantCuisines = await prisma.restaurantCuisine.findMany({ take: 10 })
     * 
     * // Only select the `restaurantId`
     * const restaurantCuisineWithRestaurantIdOnly = await prisma.restaurantCuisine.findMany({ select: { restaurantId: true } })
     * 
     */
    findMany<T extends RestaurantCuisineFindManyArgs>(args?: SelectSubset<T, RestaurantCuisineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantCuisinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RestaurantCuisine.
     * @param {RestaurantCuisineCreateArgs} args - Arguments to create a RestaurantCuisine.
     * @example
     * // Create one RestaurantCuisine
     * const RestaurantCuisine = await prisma.restaurantCuisine.create({
     *   data: {
     *     // ... data to create a RestaurantCuisine
     *   }
     * })
     * 
     */
    create<T extends RestaurantCuisineCreateArgs>(args: SelectSubset<T, RestaurantCuisineCreateArgs<ExtArgs>>): Prisma__RestaurantCuisineClient<$Result.GetResult<Prisma.$RestaurantCuisinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RestaurantCuisines.
     * @param {RestaurantCuisineCreateManyArgs} args - Arguments to create many RestaurantCuisines.
     * @example
     * // Create many RestaurantCuisines
     * const restaurantCuisine = await prisma.restaurantCuisine.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RestaurantCuisineCreateManyArgs>(args?: SelectSubset<T, RestaurantCuisineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RestaurantCuisines and returns the data saved in the database.
     * @param {RestaurantCuisineCreateManyAndReturnArgs} args - Arguments to create many RestaurantCuisines.
     * @example
     * // Create many RestaurantCuisines
     * const restaurantCuisine = await prisma.restaurantCuisine.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RestaurantCuisines and only return the `restaurantId`
     * const restaurantCuisineWithRestaurantIdOnly = await prisma.restaurantCuisine.createManyAndReturn({
     *   select: { restaurantId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RestaurantCuisineCreateManyAndReturnArgs>(args?: SelectSubset<T, RestaurantCuisineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantCuisinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RestaurantCuisine.
     * @param {RestaurantCuisineDeleteArgs} args - Arguments to delete one RestaurantCuisine.
     * @example
     * // Delete one RestaurantCuisine
     * const RestaurantCuisine = await prisma.restaurantCuisine.delete({
     *   where: {
     *     // ... filter to delete one RestaurantCuisine
     *   }
     * })
     * 
     */
    delete<T extends RestaurantCuisineDeleteArgs>(args: SelectSubset<T, RestaurantCuisineDeleteArgs<ExtArgs>>): Prisma__RestaurantCuisineClient<$Result.GetResult<Prisma.$RestaurantCuisinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RestaurantCuisine.
     * @param {RestaurantCuisineUpdateArgs} args - Arguments to update one RestaurantCuisine.
     * @example
     * // Update one RestaurantCuisine
     * const restaurantCuisine = await prisma.restaurantCuisine.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RestaurantCuisineUpdateArgs>(args: SelectSubset<T, RestaurantCuisineUpdateArgs<ExtArgs>>): Prisma__RestaurantCuisineClient<$Result.GetResult<Prisma.$RestaurantCuisinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RestaurantCuisines.
     * @param {RestaurantCuisineDeleteManyArgs} args - Arguments to filter RestaurantCuisines to delete.
     * @example
     * // Delete a few RestaurantCuisines
     * const { count } = await prisma.restaurantCuisine.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RestaurantCuisineDeleteManyArgs>(args?: SelectSubset<T, RestaurantCuisineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RestaurantCuisines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantCuisineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RestaurantCuisines
     * const restaurantCuisine = await prisma.restaurantCuisine.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RestaurantCuisineUpdateManyArgs>(args: SelectSubset<T, RestaurantCuisineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RestaurantCuisines and returns the data updated in the database.
     * @param {RestaurantCuisineUpdateManyAndReturnArgs} args - Arguments to update many RestaurantCuisines.
     * @example
     * // Update many RestaurantCuisines
     * const restaurantCuisine = await prisma.restaurantCuisine.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RestaurantCuisines and only return the `restaurantId`
     * const restaurantCuisineWithRestaurantIdOnly = await prisma.restaurantCuisine.updateManyAndReturn({
     *   select: { restaurantId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RestaurantCuisineUpdateManyAndReturnArgs>(args: SelectSubset<T, RestaurantCuisineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RestaurantCuisinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RestaurantCuisine.
     * @param {RestaurantCuisineUpsertArgs} args - Arguments to update or create a RestaurantCuisine.
     * @example
     * // Update or create a RestaurantCuisine
     * const restaurantCuisine = await prisma.restaurantCuisine.upsert({
     *   create: {
     *     // ... data to create a RestaurantCuisine
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RestaurantCuisine we want to update
     *   }
     * })
     */
    upsert<T extends RestaurantCuisineUpsertArgs>(args: SelectSubset<T, RestaurantCuisineUpsertArgs<ExtArgs>>): Prisma__RestaurantCuisineClient<$Result.GetResult<Prisma.$RestaurantCuisinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RestaurantCuisines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantCuisineCountArgs} args - Arguments to filter RestaurantCuisines to count.
     * @example
     * // Count the number of RestaurantCuisines
     * const count = await prisma.restaurantCuisine.count({
     *   where: {
     *     // ... the filter for the RestaurantCuisines we want to count
     *   }
     * })
    **/
    count<T extends RestaurantCuisineCountArgs>(
      args?: Subset<T, RestaurantCuisineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RestaurantCuisineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RestaurantCuisine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantCuisineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RestaurantCuisineAggregateArgs>(args: Subset<T, RestaurantCuisineAggregateArgs>): Prisma.PrismaPromise<GetRestaurantCuisineAggregateType<T>>

    /**
     * Group by RestaurantCuisine.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantCuisineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RestaurantCuisineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RestaurantCuisineGroupByArgs['orderBy'] }
        : { orderBy?: RestaurantCuisineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RestaurantCuisineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRestaurantCuisineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RestaurantCuisine model
   */
  readonly fields: RestaurantCuisineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RestaurantCuisine.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RestaurantCuisineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    restaurant<T extends RestaurantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RestaurantDefaultArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cuisine<T extends CuisineDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CuisineDefaultArgs<ExtArgs>>): Prisma__CuisineClient<$Result.GetResult<Prisma.$CuisinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RestaurantCuisine model
   */
  interface RestaurantCuisineFieldRefs {
    readonly restaurantId: FieldRef<"RestaurantCuisine", 'Int'>
    readonly cuisineId: FieldRef<"RestaurantCuisine", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * RestaurantCuisine findUnique
   */
  export type RestaurantCuisineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantCuisine
     */
    select?: RestaurantCuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantCuisine
     */
    omit?: RestaurantCuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantCuisineInclude<ExtArgs> | null
    /**
     * Filter, which RestaurantCuisine to fetch.
     */
    where: RestaurantCuisineWhereUniqueInput
  }

  /**
   * RestaurantCuisine findUniqueOrThrow
   */
  export type RestaurantCuisineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantCuisine
     */
    select?: RestaurantCuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantCuisine
     */
    omit?: RestaurantCuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantCuisineInclude<ExtArgs> | null
    /**
     * Filter, which RestaurantCuisine to fetch.
     */
    where: RestaurantCuisineWhereUniqueInput
  }

  /**
   * RestaurantCuisine findFirst
   */
  export type RestaurantCuisineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantCuisine
     */
    select?: RestaurantCuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantCuisine
     */
    omit?: RestaurantCuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantCuisineInclude<ExtArgs> | null
    /**
     * Filter, which RestaurantCuisine to fetch.
     */
    where?: RestaurantCuisineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestaurantCuisines to fetch.
     */
    orderBy?: RestaurantCuisineOrderByWithRelationInput | RestaurantCuisineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RestaurantCuisines.
     */
    cursor?: RestaurantCuisineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestaurantCuisines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestaurantCuisines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RestaurantCuisines.
     */
    distinct?: RestaurantCuisineScalarFieldEnum | RestaurantCuisineScalarFieldEnum[]
  }

  /**
   * RestaurantCuisine findFirstOrThrow
   */
  export type RestaurantCuisineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantCuisine
     */
    select?: RestaurantCuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantCuisine
     */
    omit?: RestaurantCuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantCuisineInclude<ExtArgs> | null
    /**
     * Filter, which RestaurantCuisine to fetch.
     */
    where?: RestaurantCuisineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestaurantCuisines to fetch.
     */
    orderBy?: RestaurantCuisineOrderByWithRelationInput | RestaurantCuisineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RestaurantCuisines.
     */
    cursor?: RestaurantCuisineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestaurantCuisines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestaurantCuisines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RestaurantCuisines.
     */
    distinct?: RestaurantCuisineScalarFieldEnum | RestaurantCuisineScalarFieldEnum[]
  }

  /**
   * RestaurantCuisine findMany
   */
  export type RestaurantCuisineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantCuisine
     */
    select?: RestaurantCuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantCuisine
     */
    omit?: RestaurantCuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantCuisineInclude<ExtArgs> | null
    /**
     * Filter, which RestaurantCuisines to fetch.
     */
    where?: RestaurantCuisineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RestaurantCuisines to fetch.
     */
    orderBy?: RestaurantCuisineOrderByWithRelationInput | RestaurantCuisineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RestaurantCuisines.
     */
    cursor?: RestaurantCuisineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RestaurantCuisines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RestaurantCuisines.
     */
    skip?: number
    distinct?: RestaurantCuisineScalarFieldEnum | RestaurantCuisineScalarFieldEnum[]
  }

  /**
   * RestaurantCuisine create
   */
  export type RestaurantCuisineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantCuisine
     */
    select?: RestaurantCuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantCuisine
     */
    omit?: RestaurantCuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantCuisineInclude<ExtArgs> | null
    /**
     * The data needed to create a RestaurantCuisine.
     */
    data: XOR<RestaurantCuisineCreateInput, RestaurantCuisineUncheckedCreateInput>
  }

  /**
   * RestaurantCuisine createMany
   */
  export type RestaurantCuisineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RestaurantCuisines.
     */
    data: RestaurantCuisineCreateManyInput | RestaurantCuisineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RestaurantCuisine createManyAndReturn
   */
  export type RestaurantCuisineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantCuisine
     */
    select?: RestaurantCuisineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantCuisine
     */
    omit?: RestaurantCuisineOmit<ExtArgs> | null
    /**
     * The data used to create many RestaurantCuisines.
     */
    data: RestaurantCuisineCreateManyInput | RestaurantCuisineCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantCuisineIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RestaurantCuisine update
   */
  export type RestaurantCuisineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantCuisine
     */
    select?: RestaurantCuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantCuisine
     */
    omit?: RestaurantCuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantCuisineInclude<ExtArgs> | null
    /**
     * The data needed to update a RestaurantCuisine.
     */
    data: XOR<RestaurantCuisineUpdateInput, RestaurantCuisineUncheckedUpdateInput>
    /**
     * Choose, which RestaurantCuisine to update.
     */
    where: RestaurantCuisineWhereUniqueInput
  }

  /**
   * RestaurantCuisine updateMany
   */
  export type RestaurantCuisineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RestaurantCuisines.
     */
    data: XOR<RestaurantCuisineUpdateManyMutationInput, RestaurantCuisineUncheckedUpdateManyInput>
    /**
     * Filter which RestaurantCuisines to update
     */
    where?: RestaurantCuisineWhereInput
    /**
     * Limit how many RestaurantCuisines to update.
     */
    limit?: number
  }

  /**
   * RestaurantCuisine updateManyAndReturn
   */
  export type RestaurantCuisineUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantCuisine
     */
    select?: RestaurantCuisineSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantCuisine
     */
    omit?: RestaurantCuisineOmit<ExtArgs> | null
    /**
     * The data used to update RestaurantCuisines.
     */
    data: XOR<RestaurantCuisineUpdateManyMutationInput, RestaurantCuisineUncheckedUpdateManyInput>
    /**
     * Filter which RestaurantCuisines to update
     */
    where?: RestaurantCuisineWhereInput
    /**
     * Limit how many RestaurantCuisines to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantCuisineIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RestaurantCuisine upsert
   */
  export type RestaurantCuisineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantCuisine
     */
    select?: RestaurantCuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantCuisine
     */
    omit?: RestaurantCuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantCuisineInclude<ExtArgs> | null
    /**
     * The filter to search for the RestaurantCuisine to update in case it exists.
     */
    where: RestaurantCuisineWhereUniqueInput
    /**
     * In case the RestaurantCuisine found by the `where` argument doesn't exist, create a new RestaurantCuisine with this data.
     */
    create: XOR<RestaurantCuisineCreateInput, RestaurantCuisineUncheckedCreateInput>
    /**
     * In case the RestaurantCuisine was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RestaurantCuisineUpdateInput, RestaurantCuisineUncheckedUpdateInput>
  }

  /**
   * RestaurantCuisine delete
   */
  export type RestaurantCuisineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantCuisine
     */
    select?: RestaurantCuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantCuisine
     */
    omit?: RestaurantCuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantCuisineInclude<ExtArgs> | null
    /**
     * Filter which RestaurantCuisine to delete.
     */
    where: RestaurantCuisineWhereUniqueInput
  }

  /**
   * RestaurantCuisine deleteMany
   */
  export type RestaurantCuisineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RestaurantCuisines to delete
     */
    where?: RestaurantCuisineWhereInput
    /**
     * Limit how many RestaurantCuisines to delete.
     */
    limit?: number
  }

  /**
   * RestaurantCuisine without action
   */
  export type RestaurantCuisineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantCuisine
     */
    select?: RestaurantCuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RestaurantCuisine
     */
    omit?: RestaurantCuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RestaurantCuisineInclude<ExtArgs> | null
  }


  /**
   * Model Dish
   */

  export type AggregateDish = {
    _count: DishCountAggregateOutputType | null
    _avg: DishAvgAggregateOutputType | null
    _sum: DishSumAggregateOutputType | null
    _min: DishMinAggregateOutputType | null
    _max: DishMaxAggregateOutputType | null
  }

  export type DishAvgAggregateOutputType = {
    id: number | null
    calories: number | null
    price: number | null
    restaurantId: number | null
    cuisineId: number | null
  }

  export type DishSumAggregateOutputType = {
    id: number | null
    calories: number | null
    price: number | null
    restaurantId: number | null
    cuisineId: number | null
  }

  export type DishMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    calories: number | null
    price: number | null
    restaurantId: number | null
    cuisineId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DishMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    calories: number | null
    price: number | null
    restaurantId: number | null
    cuisineId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DishCountAggregateOutputType = {
    id: number
    name: number
    description: number
    calories: number
    price: number
    restaurantId: number
    cuisineId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DishAvgAggregateInputType = {
    id?: true
    calories?: true
    price?: true
    restaurantId?: true
    cuisineId?: true
  }

  export type DishSumAggregateInputType = {
    id?: true
    calories?: true
    price?: true
    restaurantId?: true
    cuisineId?: true
  }

  export type DishMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    calories?: true
    price?: true
    restaurantId?: true
    cuisineId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DishMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    calories?: true
    price?: true
    restaurantId?: true
    cuisineId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DishCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    calories?: true
    price?: true
    restaurantId?: true
    cuisineId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DishAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dish to aggregate.
     */
    where?: DishWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dishes to fetch.
     */
    orderBy?: DishOrderByWithRelationInput | DishOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DishWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dishes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dishes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Dishes
    **/
    _count?: true | DishCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DishAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DishSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DishMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DishMaxAggregateInputType
  }

  export type GetDishAggregateType<T extends DishAggregateArgs> = {
        [P in keyof T & keyof AggregateDish]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDish[P]>
      : GetScalarType<T[P], AggregateDish[P]>
  }




  export type DishGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DishWhereInput
    orderBy?: DishOrderByWithAggregationInput | DishOrderByWithAggregationInput[]
    by: DishScalarFieldEnum[] | DishScalarFieldEnum
    having?: DishScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DishCountAggregateInputType | true
    _avg?: DishAvgAggregateInputType
    _sum?: DishSumAggregateInputType
    _min?: DishMinAggregateInputType
    _max?: DishMaxAggregateInputType
  }

  export type DishGroupByOutputType = {
    id: number
    name: string
    description: string | null
    calories: number | null
    price: number | null
    restaurantId: number
    cuisineId: number | null
    createdAt: Date
    updatedAt: Date
    _count: DishCountAggregateOutputType | null
    _avg: DishAvgAggregateOutputType | null
    _sum: DishSumAggregateOutputType | null
    _min: DishMinAggregateOutputType | null
    _max: DishMaxAggregateOutputType | null
  }

  type GetDishGroupByPayload<T extends DishGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DishGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DishGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DishGroupByOutputType[P]>
            : GetScalarType<T[P], DishGroupByOutputType[P]>
        }
      >
    >


  export type DishSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    calories?: boolean
    price?: boolean
    restaurantId?: boolean
    cuisineId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    cuisine?: boolean | Dish$cuisineArgs<ExtArgs>
    dishDietaries?: boolean | Dish$dishDietariesArgs<ExtArgs>
    mealPlanDishes?: boolean | Dish$mealPlanDishesArgs<ExtArgs>
    _count?: boolean | DishCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dish"]>

  export type DishSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    calories?: boolean
    price?: boolean
    restaurantId?: boolean
    cuisineId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    cuisine?: boolean | Dish$cuisineArgs<ExtArgs>
  }, ExtArgs["result"]["dish"]>

  export type DishSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    calories?: boolean
    price?: boolean
    restaurantId?: boolean
    cuisineId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    cuisine?: boolean | Dish$cuisineArgs<ExtArgs>
  }, ExtArgs["result"]["dish"]>

  export type DishSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    calories?: boolean
    price?: boolean
    restaurantId?: boolean
    cuisineId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DishOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "calories" | "price" | "restaurantId" | "cuisineId" | "createdAt" | "updatedAt", ExtArgs["result"]["dish"]>
  export type DishInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    cuisine?: boolean | Dish$cuisineArgs<ExtArgs>
    dishDietaries?: boolean | Dish$dishDietariesArgs<ExtArgs>
    mealPlanDishes?: boolean | Dish$mealPlanDishesArgs<ExtArgs>
    _count?: boolean | DishCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DishIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    cuisine?: boolean | Dish$cuisineArgs<ExtArgs>
  }
  export type DishIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    restaurant?: boolean | RestaurantDefaultArgs<ExtArgs>
    cuisine?: boolean | Dish$cuisineArgs<ExtArgs>
  }

  export type $DishPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Dish"
    objects: {
      restaurant: Prisma.$RestaurantPayload<ExtArgs>
      cuisine: Prisma.$CuisinePayload<ExtArgs> | null
      dishDietaries: Prisma.$DishDietaryPayload<ExtArgs>[]
      mealPlanDishes: Prisma.$MealPlanDishPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      calories: number | null
      price: number | null
      restaurantId: number
      cuisineId: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dish"]>
    composites: {}
  }

  type DishGetPayload<S extends boolean | null | undefined | DishDefaultArgs> = $Result.GetResult<Prisma.$DishPayload, S>

  type DishCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DishFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DishCountAggregateInputType | true
    }

  export interface DishDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Dish'], meta: { name: 'Dish' } }
    /**
     * Find zero or one Dish that matches the filter.
     * @param {DishFindUniqueArgs} args - Arguments to find a Dish
     * @example
     * // Get one Dish
     * const dish = await prisma.dish.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DishFindUniqueArgs>(args: SelectSubset<T, DishFindUniqueArgs<ExtArgs>>): Prisma__DishClient<$Result.GetResult<Prisma.$DishPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Dish that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DishFindUniqueOrThrowArgs} args - Arguments to find a Dish
     * @example
     * // Get one Dish
     * const dish = await prisma.dish.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DishFindUniqueOrThrowArgs>(args: SelectSubset<T, DishFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DishClient<$Result.GetResult<Prisma.$DishPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dish that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DishFindFirstArgs} args - Arguments to find a Dish
     * @example
     * // Get one Dish
     * const dish = await prisma.dish.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DishFindFirstArgs>(args?: SelectSubset<T, DishFindFirstArgs<ExtArgs>>): Prisma__DishClient<$Result.GetResult<Prisma.$DishPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Dish that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DishFindFirstOrThrowArgs} args - Arguments to find a Dish
     * @example
     * // Get one Dish
     * const dish = await prisma.dish.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DishFindFirstOrThrowArgs>(args?: SelectSubset<T, DishFindFirstOrThrowArgs<ExtArgs>>): Prisma__DishClient<$Result.GetResult<Prisma.$DishPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Dishes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DishFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dishes
     * const dishes = await prisma.dish.findMany()
     * 
     * // Get first 10 Dishes
     * const dishes = await prisma.dish.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dishWithIdOnly = await prisma.dish.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DishFindManyArgs>(args?: SelectSubset<T, DishFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DishPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Dish.
     * @param {DishCreateArgs} args - Arguments to create a Dish.
     * @example
     * // Create one Dish
     * const Dish = await prisma.dish.create({
     *   data: {
     *     // ... data to create a Dish
     *   }
     * })
     * 
     */
    create<T extends DishCreateArgs>(args: SelectSubset<T, DishCreateArgs<ExtArgs>>): Prisma__DishClient<$Result.GetResult<Prisma.$DishPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Dishes.
     * @param {DishCreateManyArgs} args - Arguments to create many Dishes.
     * @example
     * // Create many Dishes
     * const dish = await prisma.dish.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DishCreateManyArgs>(args?: SelectSubset<T, DishCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Dishes and returns the data saved in the database.
     * @param {DishCreateManyAndReturnArgs} args - Arguments to create many Dishes.
     * @example
     * // Create many Dishes
     * const dish = await prisma.dish.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Dishes and only return the `id`
     * const dishWithIdOnly = await prisma.dish.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DishCreateManyAndReturnArgs>(args?: SelectSubset<T, DishCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DishPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Dish.
     * @param {DishDeleteArgs} args - Arguments to delete one Dish.
     * @example
     * // Delete one Dish
     * const Dish = await prisma.dish.delete({
     *   where: {
     *     // ... filter to delete one Dish
     *   }
     * })
     * 
     */
    delete<T extends DishDeleteArgs>(args: SelectSubset<T, DishDeleteArgs<ExtArgs>>): Prisma__DishClient<$Result.GetResult<Prisma.$DishPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Dish.
     * @param {DishUpdateArgs} args - Arguments to update one Dish.
     * @example
     * // Update one Dish
     * const dish = await prisma.dish.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DishUpdateArgs>(args: SelectSubset<T, DishUpdateArgs<ExtArgs>>): Prisma__DishClient<$Result.GetResult<Prisma.$DishPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Dishes.
     * @param {DishDeleteManyArgs} args - Arguments to filter Dishes to delete.
     * @example
     * // Delete a few Dishes
     * const { count } = await prisma.dish.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DishDeleteManyArgs>(args?: SelectSubset<T, DishDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dishes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DishUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dishes
     * const dish = await prisma.dish.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DishUpdateManyArgs>(args: SelectSubset<T, DishUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dishes and returns the data updated in the database.
     * @param {DishUpdateManyAndReturnArgs} args - Arguments to update many Dishes.
     * @example
     * // Update many Dishes
     * const dish = await prisma.dish.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Dishes and only return the `id`
     * const dishWithIdOnly = await prisma.dish.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DishUpdateManyAndReturnArgs>(args: SelectSubset<T, DishUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DishPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Dish.
     * @param {DishUpsertArgs} args - Arguments to update or create a Dish.
     * @example
     * // Update or create a Dish
     * const dish = await prisma.dish.upsert({
     *   create: {
     *     // ... data to create a Dish
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dish we want to update
     *   }
     * })
     */
    upsert<T extends DishUpsertArgs>(args: SelectSubset<T, DishUpsertArgs<ExtArgs>>): Prisma__DishClient<$Result.GetResult<Prisma.$DishPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Dishes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DishCountArgs} args - Arguments to filter Dishes to count.
     * @example
     * // Count the number of Dishes
     * const count = await prisma.dish.count({
     *   where: {
     *     // ... the filter for the Dishes we want to count
     *   }
     * })
    **/
    count<T extends DishCountArgs>(
      args?: Subset<T, DishCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DishCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dish.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DishAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DishAggregateArgs>(args: Subset<T, DishAggregateArgs>): Prisma.PrismaPromise<GetDishAggregateType<T>>

    /**
     * Group by Dish.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DishGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DishGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DishGroupByArgs['orderBy'] }
        : { orderBy?: DishGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DishGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDishGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Dish model
   */
  readonly fields: DishFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Dish.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DishClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    restaurant<T extends RestaurantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RestaurantDefaultArgs<ExtArgs>>): Prisma__RestaurantClient<$Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cuisine<T extends Dish$cuisineArgs<ExtArgs> = {}>(args?: Subset<T, Dish$cuisineArgs<ExtArgs>>): Prisma__CuisineClient<$Result.GetResult<Prisma.$CuisinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    dishDietaries<T extends Dish$dishDietariesArgs<ExtArgs> = {}>(args?: Subset<T, Dish$dishDietariesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DishDietaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    mealPlanDishes<T extends Dish$mealPlanDishesArgs<ExtArgs> = {}>(args?: Subset<T, Dish$mealPlanDishesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPlanDishPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Dish model
   */
  interface DishFieldRefs {
    readonly id: FieldRef<"Dish", 'Int'>
    readonly name: FieldRef<"Dish", 'String'>
    readonly description: FieldRef<"Dish", 'String'>
    readonly calories: FieldRef<"Dish", 'Int'>
    readonly price: FieldRef<"Dish", 'Float'>
    readonly restaurantId: FieldRef<"Dish", 'Int'>
    readonly cuisineId: FieldRef<"Dish", 'Int'>
    readonly createdAt: FieldRef<"Dish", 'DateTime'>
    readonly updatedAt: FieldRef<"Dish", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Dish findUnique
   */
  export type DishFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dish
     */
    select?: DishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dish
     */
    omit?: DishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishInclude<ExtArgs> | null
    /**
     * Filter, which Dish to fetch.
     */
    where: DishWhereUniqueInput
  }

  /**
   * Dish findUniqueOrThrow
   */
  export type DishFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dish
     */
    select?: DishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dish
     */
    omit?: DishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishInclude<ExtArgs> | null
    /**
     * Filter, which Dish to fetch.
     */
    where: DishWhereUniqueInput
  }

  /**
   * Dish findFirst
   */
  export type DishFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dish
     */
    select?: DishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dish
     */
    omit?: DishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishInclude<ExtArgs> | null
    /**
     * Filter, which Dish to fetch.
     */
    where?: DishWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dishes to fetch.
     */
    orderBy?: DishOrderByWithRelationInput | DishOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dishes.
     */
    cursor?: DishWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dishes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dishes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dishes.
     */
    distinct?: DishScalarFieldEnum | DishScalarFieldEnum[]
  }

  /**
   * Dish findFirstOrThrow
   */
  export type DishFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dish
     */
    select?: DishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dish
     */
    omit?: DishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishInclude<ExtArgs> | null
    /**
     * Filter, which Dish to fetch.
     */
    where?: DishWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dishes to fetch.
     */
    orderBy?: DishOrderByWithRelationInput | DishOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dishes.
     */
    cursor?: DishWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dishes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dishes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dishes.
     */
    distinct?: DishScalarFieldEnum | DishScalarFieldEnum[]
  }

  /**
   * Dish findMany
   */
  export type DishFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dish
     */
    select?: DishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dish
     */
    omit?: DishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishInclude<ExtArgs> | null
    /**
     * Filter, which Dishes to fetch.
     */
    where?: DishWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dishes to fetch.
     */
    orderBy?: DishOrderByWithRelationInput | DishOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Dishes.
     */
    cursor?: DishWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dishes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dishes.
     */
    skip?: number
    distinct?: DishScalarFieldEnum | DishScalarFieldEnum[]
  }

  /**
   * Dish create
   */
  export type DishCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dish
     */
    select?: DishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dish
     */
    omit?: DishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishInclude<ExtArgs> | null
    /**
     * The data needed to create a Dish.
     */
    data: XOR<DishCreateInput, DishUncheckedCreateInput>
  }

  /**
   * Dish createMany
   */
  export type DishCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Dishes.
     */
    data: DishCreateManyInput | DishCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Dish createManyAndReturn
   */
  export type DishCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dish
     */
    select?: DishSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dish
     */
    omit?: DishOmit<ExtArgs> | null
    /**
     * The data used to create many Dishes.
     */
    data: DishCreateManyInput | DishCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Dish update
   */
  export type DishUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dish
     */
    select?: DishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dish
     */
    omit?: DishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishInclude<ExtArgs> | null
    /**
     * The data needed to update a Dish.
     */
    data: XOR<DishUpdateInput, DishUncheckedUpdateInput>
    /**
     * Choose, which Dish to update.
     */
    where: DishWhereUniqueInput
  }

  /**
   * Dish updateMany
   */
  export type DishUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Dishes.
     */
    data: XOR<DishUpdateManyMutationInput, DishUncheckedUpdateManyInput>
    /**
     * Filter which Dishes to update
     */
    where?: DishWhereInput
    /**
     * Limit how many Dishes to update.
     */
    limit?: number
  }

  /**
   * Dish updateManyAndReturn
   */
  export type DishUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dish
     */
    select?: DishSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Dish
     */
    omit?: DishOmit<ExtArgs> | null
    /**
     * The data used to update Dishes.
     */
    data: XOR<DishUpdateManyMutationInput, DishUncheckedUpdateManyInput>
    /**
     * Filter which Dishes to update
     */
    where?: DishWhereInput
    /**
     * Limit how many Dishes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Dish upsert
   */
  export type DishUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dish
     */
    select?: DishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dish
     */
    omit?: DishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishInclude<ExtArgs> | null
    /**
     * The filter to search for the Dish to update in case it exists.
     */
    where: DishWhereUniqueInput
    /**
     * In case the Dish found by the `where` argument doesn't exist, create a new Dish with this data.
     */
    create: XOR<DishCreateInput, DishUncheckedCreateInput>
    /**
     * In case the Dish was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DishUpdateInput, DishUncheckedUpdateInput>
  }

  /**
   * Dish delete
   */
  export type DishDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dish
     */
    select?: DishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dish
     */
    omit?: DishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishInclude<ExtArgs> | null
    /**
     * Filter which Dish to delete.
     */
    where: DishWhereUniqueInput
  }

  /**
   * Dish deleteMany
   */
  export type DishDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dishes to delete
     */
    where?: DishWhereInput
    /**
     * Limit how many Dishes to delete.
     */
    limit?: number
  }

  /**
   * Dish.cuisine
   */
  export type Dish$cuisineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Cuisine
     */
    select?: CuisineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Cuisine
     */
    omit?: CuisineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CuisineInclude<ExtArgs> | null
    where?: CuisineWhereInput
  }

  /**
   * Dish.dishDietaries
   */
  export type Dish$dishDietariesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DishDietary
     */
    select?: DishDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DishDietary
     */
    omit?: DishDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishDietaryInclude<ExtArgs> | null
    where?: DishDietaryWhereInput
    orderBy?: DishDietaryOrderByWithRelationInput | DishDietaryOrderByWithRelationInput[]
    cursor?: DishDietaryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DishDietaryScalarFieldEnum | DishDietaryScalarFieldEnum[]
  }

  /**
   * Dish.mealPlanDishes
   */
  export type Dish$mealPlanDishesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanDish
     */
    select?: MealPlanDishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanDish
     */
    omit?: MealPlanDishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanDishInclude<ExtArgs> | null
    where?: MealPlanDishWhereInput
    orderBy?: MealPlanDishOrderByWithRelationInput | MealPlanDishOrderByWithRelationInput[]
    cursor?: MealPlanDishWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MealPlanDishScalarFieldEnum | MealPlanDishScalarFieldEnum[]
  }

  /**
   * Dish without action
   */
  export type DishDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dish
     */
    select?: DishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Dish
     */
    omit?: DishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishInclude<ExtArgs> | null
  }


  /**
   * Model DishDietary
   */

  export type AggregateDishDietary = {
    _count: DishDietaryCountAggregateOutputType | null
    _avg: DishDietaryAvgAggregateOutputType | null
    _sum: DishDietarySumAggregateOutputType | null
    _min: DishDietaryMinAggregateOutputType | null
    _max: DishDietaryMaxAggregateOutputType | null
  }

  export type DishDietaryAvgAggregateOutputType = {
    dishId: number | null
    dietaryId: number | null
  }

  export type DishDietarySumAggregateOutputType = {
    dishId: number | null
    dietaryId: number | null
  }

  export type DishDietaryMinAggregateOutputType = {
    dishId: number | null
    dietaryId: number | null
  }

  export type DishDietaryMaxAggregateOutputType = {
    dishId: number | null
    dietaryId: number | null
  }

  export type DishDietaryCountAggregateOutputType = {
    dishId: number
    dietaryId: number
    _all: number
  }


  export type DishDietaryAvgAggregateInputType = {
    dishId?: true
    dietaryId?: true
  }

  export type DishDietarySumAggregateInputType = {
    dishId?: true
    dietaryId?: true
  }

  export type DishDietaryMinAggregateInputType = {
    dishId?: true
    dietaryId?: true
  }

  export type DishDietaryMaxAggregateInputType = {
    dishId?: true
    dietaryId?: true
  }

  export type DishDietaryCountAggregateInputType = {
    dishId?: true
    dietaryId?: true
    _all?: true
  }

  export type DishDietaryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DishDietary to aggregate.
     */
    where?: DishDietaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DishDietaries to fetch.
     */
    orderBy?: DishDietaryOrderByWithRelationInput | DishDietaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DishDietaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DishDietaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DishDietaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DishDietaries
    **/
    _count?: true | DishDietaryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DishDietaryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DishDietarySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DishDietaryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DishDietaryMaxAggregateInputType
  }

  export type GetDishDietaryAggregateType<T extends DishDietaryAggregateArgs> = {
        [P in keyof T & keyof AggregateDishDietary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDishDietary[P]>
      : GetScalarType<T[P], AggregateDishDietary[P]>
  }




  export type DishDietaryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DishDietaryWhereInput
    orderBy?: DishDietaryOrderByWithAggregationInput | DishDietaryOrderByWithAggregationInput[]
    by: DishDietaryScalarFieldEnum[] | DishDietaryScalarFieldEnum
    having?: DishDietaryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DishDietaryCountAggregateInputType | true
    _avg?: DishDietaryAvgAggregateInputType
    _sum?: DishDietarySumAggregateInputType
    _min?: DishDietaryMinAggregateInputType
    _max?: DishDietaryMaxAggregateInputType
  }

  export type DishDietaryGroupByOutputType = {
    dishId: number
    dietaryId: number
    _count: DishDietaryCountAggregateOutputType | null
    _avg: DishDietaryAvgAggregateOutputType | null
    _sum: DishDietarySumAggregateOutputType | null
    _min: DishDietaryMinAggregateOutputType | null
    _max: DishDietaryMaxAggregateOutputType | null
  }

  type GetDishDietaryGroupByPayload<T extends DishDietaryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DishDietaryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DishDietaryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DishDietaryGroupByOutputType[P]>
            : GetScalarType<T[P], DishDietaryGroupByOutputType[P]>
        }
      >
    >


  export type DishDietarySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    dishId?: boolean
    dietaryId?: boolean
    dish?: boolean | DishDefaultArgs<ExtArgs>
    dietary?: boolean | DietaryRestrictionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dishDietary"]>

  export type DishDietarySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    dishId?: boolean
    dietaryId?: boolean
    dish?: boolean | DishDefaultArgs<ExtArgs>
    dietary?: boolean | DietaryRestrictionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dishDietary"]>

  export type DishDietarySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    dishId?: boolean
    dietaryId?: boolean
    dish?: boolean | DishDefaultArgs<ExtArgs>
    dietary?: boolean | DietaryRestrictionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dishDietary"]>

  export type DishDietarySelectScalar = {
    dishId?: boolean
    dietaryId?: boolean
  }

  export type DishDietaryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"dishId" | "dietaryId", ExtArgs["result"]["dishDietary"]>
  export type DishDietaryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dish?: boolean | DishDefaultArgs<ExtArgs>
    dietary?: boolean | DietaryRestrictionDefaultArgs<ExtArgs>
  }
  export type DishDietaryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dish?: boolean | DishDefaultArgs<ExtArgs>
    dietary?: boolean | DietaryRestrictionDefaultArgs<ExtArgs>
  }
  export type DishDietaryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dish?: boolean | DishDefaultArgs<ExtArgs>
    dietary?: boolean | DietaryRestrictionDefaultArgs<ExtArgs>
  }

  export type $DishDietaryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DishDietary"
    objects: {
      dish: Prisma.$DishPayload<ExtArgs>
      dietary: Prisma.$DietaryRestrictionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      dishId: number
      dietaryId: number
    }, ExtArgs["result"]["dishDietary"]>
    composites: {}
  }

  type DishDietaryGetPayload<S extends boolean | null | undefined | DishDietaryDefaultArgs> = $Result.GetResult<Prisma.$DishDietaryPayload, S>

  type DishDietaryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DishDietaryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DishDietaryCountAggregateInputType | true
    }

  export interface DishDietaryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DishDietary'], meta: { name: 'DishDietary' } }
    /**
     * Find zero or one DishDietary that matches the filter.
     * @param {DishDietaryFindUniqueArgs} args - Arguments to find a DishDietary
     * @example
     * // Get one DishDietary
     * const dishDietary = await prisma.dishDietary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DishDietaryFindUniqueArgs>(args: SelectSubset<T, DishDietaryFindUniqueArgs<ExtArgs>>): Prisma__DishDietaryClient<$Result.GetResult<Prisma.$DishDietaryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DishDietary that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DishDietaryFindUniqueOrThrowArgs} args - Arguments to find a DishDietary
     * @example
     * // Get one DishDietary
     * const dishDietary = await prisma.dishDietary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DishDietaryFindUniqueOrThrowArgs>(args: SelectSubset<T, DishDietaryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DishDietaryClient<$Result.GetResult<Prisma.$DishDietaryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DishDietary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DishDietaryFindFirstArgs} args - Arguments to find a DishDietary
     * @example
     * // Get one DishDietary
     * const dishDietary = await prisma.dishDietary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DishDietaryFindFirstArgs>(args?: SelectSubset<T, DishDietaryFindFirstArgs<ExtArgs>>): Prisma__DishDietaryClient<$Result.GetResult<Prisma.$DishDietaryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DishDietary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DishDietaryFindFirstOrThrowArgs} args - Arguments to find a DishDietary
     * @example
     * // Get one DishDietary
     * const dishDietary = await prisma.dishDietary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DishDietaryFindFirstOrThrowArgs>(args?: SelectSubset<T, DishDietaryFindFirstOrThrowArgs<ExtArgs>>): Prisma__DishDietaryClient<$Result.GetResult<Prisma.$DishDietaryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DishDietaries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DishDietaryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DishDietaries
     * const dishDietaries = await prisma.dishDietary.findMany()
     * 
     * // Get first 10 DishDietaries
     * const dishDietaries = await prisma.dishDietary.findMany({ take: 10 })
     * 
     * // Only select the `dishId`
     * const dishDietaryWithDishIdOnly = await prisma.dishDietary.findMany({ select: { dishId: true } })
     * 
     */
    findMany<T extends DishDietaryFindManyArgs>(args?: SelectSubset<T, DishDietaryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DishDietaryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DishDietary.
     * @param {DishDietaryCreateArgs} args - Arguments to create a DishDietary.
     * @example
     * // Create one DishDietary
     * const DishDietary = await prisma.dishDietary.create({
     *   data: {
     *     // ... data to create a DishDietary
     *   }
     * })
     * 
     */
    create<T extends DishDietaryCreateArgs>(args: SelectSubset<T, DishDietaryCreateArgs<ExtArgs>>): Prisma__DishDietaryClient<$Result.GetResult<Prisma.$DishDietaryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DishDietaries.
     * @param {DishDietaryCreateManyArgs} args - Arguments to create many DishDietaries.
     * @example
     * // Create many DishDietaries
     * const dishDietary = await prisma.dishDietary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DishDietaryCreateManyArgs>(args?: SelectSubset<T, DishDietaryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DishDietaries and returns the data saved in the database.
     * @param {DishDietaryCreateManyAndReturnArgs} args - Arguments to create many DishDietaries.
     * @example
     * // Create many DishDietaries
     * const dishDietary = await prisma.dishDietary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DishDietaries and only return the `dishId`
     * const dishDietaryWithDishIdOnly = await prisma.dishDietary.createManyAndReturn({
     *   select: { dishId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DishDietaryCreateManyAndReturnArgs>(args?: SelectSubset<T, DishDietaryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DishDietaryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DishDietary.
     * @param {DishDietaryDeleteArgs} args - Arguments to delete one DishDietary.
     * @example
     * // Delete one DishDietary
     * const DishDietary = await prisma.dishDietary.delete({
     *   where: {
     *     // ... filter to delete one DishDietary
     *   }
     * })
     * 
     */
    delete<T extends DishDietaryDeleteArgs>(args: SelectSubset<T, DishDietaryDeleteArgs<ExtArgs>>): Prisma__DishDietaryClient<$Result.GetResult<Prisma.$DishDietaryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DishDietary.
     * @param {DishDietaryUpdateArgs} args - Arguments to update one DishDietary.
     * @example
     * // Update one DishDietary
     * const dishDietary = await prisma.dishDietary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DishDietaryUpdateArgs>(args: SelectSubset<T, DishDietaryUpdateArgs<ExtArgs>>): Prisma__DishDietaryClient<$Result.GetResult<Prisma.$DishDietaryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DishDietaries.
     * @param {DishDietaryDeleteManyArgs} args - Arguments to filter DishDietaries to delete.
     * @example
     * // Delete a few DishDietaries
     * const { count } = await prisma.dishDietary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DishDietaryDeleteManyArgs>(args?: SelectSubset<T, DishDietaryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DishDietaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DishDietaryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DishDietaries
     * const dishDietary = await prisma.dishDietary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DishDietaryUpdateManyArgs>(args: SelectSubset<T, DishDietaryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DishDietaries and returns the data updated in the database.
     * @param {DishDietaryUpdateManyAndReturnArgs} args - Arguments to update many DishDietaries.
     * @example
     * // Update many DishDietaries
     * const dishDietary = await prisma.dishDietary.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DishDietaries and only return the `dishId`
     * const dishDietaryWithDishIdOnly = await prisma.dishDietary.updateManyAndReturn({
     *   select: { dishId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DishDietaryUpdateManyAndReturnArgs>(args: SelectSubset<T, DishDietaryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DishDietaryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DishDietary.
     * @param {DishDietaryUpsertArgs} args - Arguments to update or create a DishDietary.
     * @example
     * // Update or create a DishDietary
     * const dishDietary = await prisma.dishDietary.upsert({
     *   create: {
     *     // ... data to create a DishDietary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DishDietary we want to update
     *   }
     * })
     */
    upsert<T extends DishDietaryUpsertArgs>(args: SelectSubset<T, DishDietaryUpsertArgs<ExtArgs>>): Prisma__DishDietaryClient<$Result.GetResult<Prisma.$DishDietaryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DishDietaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DishDietaryCountArgs} args - Arguments to filter DishDietaries to count.
     * @example
     * // Count the number of DishDietaries
     * const count = await prisma.dishDietary.count({
     *   where: {
     *     // ... the filter for the DishDietaries we want to count
     *   }
     * })
    **/
    count<T extends DishDietaryCountArgs>(
      args?: Subset<T, DishDietaryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DishDietaryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DishDietary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DishDietaryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DishDietaryAggregateArgs>(args: Subset<T, DishDietaryAggregateArgs>): Prisma.PrismaPromise<GetDishDietaryAggregateType<T>>

    /**
     * Group by DishDietary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DishDietaryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DishDietaryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DishDietaryGroupByArgs['orderBy'] }
        : { orderBy?: DishDietaryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DishDietaryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDishDietaryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DishDietary model
   */
  readonly fields: DishDietaryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DishDietary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DishDietaryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dish<T extends DishDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DishDefaultArgs<ExtArgs>>): Prisma__DishClient<$Result.GetResult<Prisma.$DishPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    dietary<T extends DietaryRestrictionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DietaryRestrictionDefaultArgs<ExtArgs>>): Prisma__DietaryRestrictionClient<$Result.GetResult<Prisma.$DietaryRestrictionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DishDietary model
   */
  interface DishDietaryFieldRefs {
    readonly dishId: FieldRef<"DishDietary", 'Int'>
    readonly dietaryId: FieldRef<"DishDietary", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * DishDietary findUnique
   */
  export type DishDietaryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DishDietary
     */
    select?: DishDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DishDietary
     */
    omit?: DishDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishDietaryInclude<ExtArgs> | null
    /**
     * Filter, which DishDietary to fetch.
     */
    where: DishDietaryWhereUniqueInput
  }

  /**
   * DishDietary findUniqueOrThrow
   */
  export type DishDietaryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DishDietary
     */
    select?: DishDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DishDietary
     */
    omit?: DishDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishDietaryInclude<ExtArgs> | null
    /**
     * Filter, which DishDietary to fetch.
     */
    where: DishDietaryWhereUniqueInput
  }

  /**
   * DishDietary findFirst
   */
  export type DishDietaryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DishDietary
     */
    select?: DishDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DishDietary
     */
    omit?: DishDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishDietaryInclude<ExtArgs> | null
    /**
     * Filter, which DishDietary to fetch.
     */
    where?: DishDietaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DishDietaries to fetch.
     */
    orderBy?: DishDietaryOrderByWithRelationInput | DishDietaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DishDietaries.
     */
    cursor?: DishDietaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DishDietaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DishDietaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DishDietaries.
     */
    distinct?: DishDietaryScalarFieldEnum | DishDietaryScalarFieldEnum[]
  }

  /**
   * DishDietary findFirstOrThrow
   */
  export type DishDietaryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DishDietary
     */
    select?: DishDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DishDietary
     */
    omit?: DishDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishDietaryInclude<ExtArgs> | null
    /**
     * Filter, which DishDietary to fetch.
     */
    where?: DishDietaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DishDietaries to fetch.
     */
    orderBy?: DishDietaryOrderByWithRelationInput | DishDietaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DishDietaries.
     */
    cursor?: DishDietaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DishDietaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DishDietaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DishDietaries.
     */
    distinct?: DishDietaryScalarFieldEnum | DishDietaryScalarFieldEnum[]
  }

  /**
   * DishDietary findMany
   */
  export type DishDietaryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DishDietary
     */
    select?: DishDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DishDietary
     */
    omit?: DishDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishDietaryInclude<ExtArgs> | null
    /**
     * Filter, which DishDietaries to fetch.
     */
    where?: DishDietaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DishDietaries to fetch.
     */
    orderBy?: DishDietaryOrderByWithRelationInput | DishDietaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DishDietaries.
     */
    cursor?: DishDietaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DishDietaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DishDietaries.
     */
    skip?: number
    distinct?: DishDietaryScalarFieldEnum | DishDietaryScalarFieldEnum[]
  }

  /**
   * DishDietary create
   */
  export type DishDietaryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DishDietary
     */
    select?: DishDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DishDietary
     */
    omit?: DishDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishDietaryInclude<ExtArgs> | null
    /**
     * The data needed to create a DishDietary.
     */
    data: XOR<DishDietaryCreateInput, DishDietaryUncheckedCreateInput>
  }

  /**
   * DishDietary createMany
   */
  export type DishDietaryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DishDietaries.
     */
    data: DishDietaryCreateManyInput | DishDietaryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DishDietary createManyAndReturn
   */
  export type DishDietaryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DishDietary
     */
    select?: DishDietarySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DishDietary
     */
    omit?: DishDietaryOmit<ExtArgs> | null
    /**
     * The data used to create many DishDietaries.
     */
    data: DishDietaryCreateManyInput | DishDietaryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishDietaryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DishDietary update
   */
  export type DishDietaryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DishDietary
     */
    select?: DishDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DishDietary
     */
    omit?: DishDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishDietaryInclude<ExtArgs> | null
    /**
     * The data needed to update a DishDietary.
     */
    data: XOR<DishDietaryUpdateInput, DishDietaryUncheckedUpdateInput>
    /**
     * Choose, which DishDietary to update.
     */
    where: DishDietaryWhereUniqueInput
  }

  /**
   * DishDietary updateMany
   */
  export type DishDietaryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DishDietaries.
     */
    data: XOR<DishDietaryUpdateManyMutationInput, DishDietaryUncheckedUpdateManyInput>
    /**
     * Filter which DishDietaries to update
     */
    where?: DishDietaryWhereInput
    /**
     * Limit how many DishDietaries to update.
     */
    limit?: number
  }

  /**
   * DishDietary updateManyAndReturn
   */
  export type DishDietaryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DishDietary
     */
    select?: DishDietarySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DishDietary
     */
    omit?: DishDietaryOmit<ExtArgs> | null
    /**
     * The data used to update DishDietaries.
     */
    data: XOR<DishDietaryUpdateManyMutationInput, DishDietaryUncheckedUpdateManyInput>
    /**
     * Filter which DishDietaries to update
     */
    where?: DishDietaryWhereInput
    /**
     * Limit how many DishDietaries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishDietaryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DishDietary upsert
   */
  export type DishDietaryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DishDietary
     */
    select?: DishDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DishDietary
     */
    omit?: DishDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishDietaryInclude<ExtArgs> | null
    /**
     * The filter to search for the DishDietary to update in case it exists.
     */
    where: DishDietaryWhereUniqueInput
    /**
     * In case the DishDietary found by the `where` argument doesn't exist, create a new DishDietary with this data.
     */
    create: XOR<DishDietaryCreateInput, DishDietaryUncheckedCreateInput>
    /**
     * In case the DishDietary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DishDietaryUpdateInput, DishDietaryUncheckedUpdateInput>
  }

  /**
   * DishDietary delete
   */
  export type DishDietaryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DishDietary
     */
    select?: DishDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DishDietary
     */
    omit?: DishDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishDietaryInclude<ExtArgs> | null
    /**
     * Filter which DishDietary to delete.
     */
    where: DishDietaryWhereUniqueInput
  }

  /**
   * DishDietary deleteMany
   */
  export type DishDietaryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DishDietaries to delete
     */
    where?: DishDietaryWhereInput
    /**
     * Limit how many DishDietaries to delete.
     */
    limit?: number
  }

  /**
   * DishDietary without action
   */
  export type DishDietaryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DishDietary
     */
    select?: DishDietarySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DishDietary
     */
    omit?: DishDietaryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DishDietaryInclude<ExtArgs> | null
  }


  /**
   * Model UserMealPlan
   */

  export type AggregateUserMealPlan = {
    _count: UserMealPlanCountAggregateOutputType | null
    _avg: UserMealPlanAvgAggregateOutputType | null
    _sum: UserMealPlanSumAggregateOutputType | null
    _min: UserMealPlanMinAggregateOutputType | null
    _max: UserMealPlanMaxAggregateOutputType | null
  }

  export type UserMealPlanAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type UserMealPlanSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type UserMealPlanMinAggregateOutputType = {
    id: number | null
    userId: number | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMealPlanMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMealPlanCountAggregateOutputType = {
    id: number
    userId: number
    date: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMealPlanAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type UserMealPlanSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type UserMealPlanMinAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMealPlanMaxAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMealPlanCountAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserMealPlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserMealPlan to aggregate.
     */
    where?: UserMealPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserMealPlans to fetch.
     */
    orderBy?: UserMealPlanOrderByWithRelationInput | UserMealPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserMealPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserMealPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserMealPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserMealPlans
    **/
    _count?: true | UserMealPlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserMealPlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserMealPlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMealPlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMealPlanMaxAggregateInputType
  }

  export type GetUserMealPlanAggregateType<T extends UserMealPlanAggregateArgs> = {
        [P in keyof T & keyof AggregateUserMealPlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserMealPlan[P]>
      : GetScalarType<T[P], AggregateUserMealPlan[P]>
  }




  export type UserMealPlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserMealPlanWhereInput
    orderBy?: UserMealPlanOrderByWithAggregationInput | UserMealPlanOrderByWithAggregationInput[]
    by: UserMealPlanScalarFieldEnum[] | UserMealPlanScalarFieldEnum
    having?: UserMealPlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserMealPlanCountAggregateInputType | true
    _avg?: UserMealPlanAvgAggregateInputType
    _sum?: UserMealPlanSumAggregateInputType
    _min?: UserMealPlanMinAggregateInputType
    _max?: UserMealPlanMaxAggregateInputType
  }

  export type UserMealPlanGroupByOutputType = {
    id: number
    userId: number
    date: Date
    createdAt: Date
    updatedAt: Date
    _count: UserMealPlanCountAggregateOutputType | null
    _avg: UserMealPlanAvgAggregateOutputType | null
    _sum: UserMealPlanSumAggregateOutputType | null
    _min: UserMealPlanMinAggregateOutputType | null
    _max: UserMealPlanMaxAggregateOutputType | null
  }

  type GetUserMealPlanGroupByPayload<T extends UserMealPlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserMealPlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserMealPlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserMealPlanGroupByOutputType[P]>
            : GetScalarType<T[P], UserMealPlanGroupByOutputType[P]>
        }
      >
    >


  export type UserMealPlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    mealPlanDishes?: boolean | UserMealPlan$mealPlanDishesArgs<ExtArgs>
    _count?: boolean | UserMealPlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userMealPlan"]>

  export type UserMealPlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userMealPlan"]>

  export type UserMealPlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userMealPlan"]>

  export type UserMealPlanSelectScalar = {
    id?: boolean
    userId?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserMealPlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "date" | "createdAt" | "updatedAt", ExtArgs["result"]["userMealPlan"]>
  export type UserMealPlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    mealPlanDishes?: boolean | UserMealPlan$mealPlanDishesArgs<ExtArgs>
    _count?: boolean | UserMealPlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserMealPlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserMealPlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserMealPlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserMealPlan"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      mealPlanDishes: Prisma.$MealPlanDishPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      date: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userMealPlan"]>
    composites: {}
  }

  type UserMealPlanGetPayload<S extends boolean | null | undefined | UserMealPlanDefaultArgs> = $Result.GetResult<Prisma.$UserMealPlanPayload, S>

  type UserMealPlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserMealPlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserMealPlanCountAggregateInputType | true
    }

  export interface UserMealPlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserMealPlan'], meta: { name: 'UserMealPlan' } }
    /**
     * Find zero or one UserMealPlan that matches the filter.
     * @param {UserMealPlanFindUniqueArgs} args - Arguments to find a UserMealPlan
     * @example
     * // Get one UserMealPlan
     * const userMealPlan = await prisma.userMealPlan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserMealPlanFindUniqueArgs>(args: SelectSubset<T, UserMealPlanFindUniqueArgs<ExtArgs>>): Prisma__UserMealPlanClient<$Result.GetResult<Prisma.$UserMealPlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserMealPlan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserMealPlanFindUniqueOrThrowArgs} args - Arguments to find a UserMealPlan
     * @example
     * // Get one UserMealPlan
     * const userMealPlan = await prisma.userMealPlan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserMealPlanFindUniqueOrThrowArgs>(args: SelectSubset<T, UserMealPlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserMealPlanClient<$Result.GetResult<Prisma.$UserMealPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserMealPlan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMealPlanFindFirstArgs} args - Arguments to find a UserMealPlan
     * @example
     * // Get one UserMealPlan
     * const userMealPlan = await prisma.userMealPlan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserMealPlanFindFirstArgs>(args?: SelectSubset<T, UserMealPlanFindFirstArgs<ExtArgs>>): Prisma__UserMealPlanClient<$Result.GetResult<Prisma.$UserMealPlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserMealPlan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMealPlanFindFirstOrThrowArgs} args - Arguments to find a UserMealPlan
     * @example
     * // Get one UserMealPlan
     * const userMealPlan = await prisma.userMealPlan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserMealPlanFindFirstOrThrowArgs>(args?: SelectSubset<T, UserMealPlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserMealPlanClient<$Result.GetResult<Prisma.$UserMealPlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserMealPlans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMealPlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserMealPlans
     * const userMealPlans = await prisma.userMealPlan.findMany()
     * 
     * // Get first 10 UserMealPlans
     * const userMealPlans = await prisma.userMealPlan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userMealPlanWithIdOnly = await prisma.userMealPlan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserMealPlanFindManyArgs>(args?: SelectSubset<T, UserMealPlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserMealPlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserMealPlan.
     * @param {UserMealPlanCreateArgs} args - Arguments to create a UserMealPlan.
     * @example
     * // Create one UserMealPlan
     * const UserMealPlan = await prisma.userMealPlan.create({
     *   data: {
     *     // ... data to create a UserMealPlan
     *   }
     * })
     * 
     */
    create<T extends UserMealPlanCreateArgs>(args: SelectSubset<T, UserMealPlanCreateArgs<ExtArgs>>): Prisma__UserMealPlanClient<$Result.GetResult<Prisma.$UserMealPlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserMealPlans.
     * @param {UserMealPlanCreateManyArgs} args - Arguments to create many UserMealPlans.
     * @example
     * // Create many UserMealPlans
     * const userMealPlan = await prisma.userMealPlan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserMealPlanCreateManyArgs>(args?: SelectSubset<T, UserMealPlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserMealPlans and returns the data saved in the database.
     * @param {UserMealPlanCreateManyAndReturnArgs} args - Arguments to create many UserMealPlans.
     * @example
     * // Create many UserMealPlans
     * const userMealPlan = await prisma.userMealPlan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserMealPlans and only return the `id`
     * const userMealPlanWithIdOnly = await prisma.userMealPlan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserMealPlanCreateManyAndReturnArgs>(args?: SelectSubset<T, UserMealPlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserMealPlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserMealPlan.
     * @param {UserMealPlanDeleteArgs} args - Arguments to delete one UserMealPlan.
     * @example
     * // Delete one UserMealPlan
     * const UserMealPlan = await prisma.userMealPlan.delete({
     *   where: {
     *     // ... filter to delete one UserMealPlan
     *   }
     * })
     * 
     */
    delete<T extends UserMealPlanDeleteArgs>(args: SelectSubset<T, UserMealPlanDeleteArgs<ExtArgs>>): Prisma__UserMealPlanClient<$Result.GetResult<Prisma.$UserMealPlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserMealPlan.
     * @param {UserMealPlanUpdateArgs} args - Arguments to update one UserMealPlan.
     * @example
     * // Update one UserMealPlan
     * const userMealPlan = await prisma.userMealPlan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserMealPlanUpdateArgs>(args: SelectSubset<T, UserMealPlanUpdateArgs<ExtArgs>>): Prisma__UserMealPlanClient<$Result.GetResult<Prisma.$UserMealPlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserMealPlans.
     * @param {UserMealPlanDeleteManyArgs} args - Arguments to filter UserMealPlans to delete.
     * @example
     * // Delete a few UserMealPlans
     * const { count } = await prisma.userMealPlan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserMealPlanDeleteManyArgs>(args?: SelectSubset<T, UserMealPlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserMealPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMealPlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserMealPlans
     * const userMealPlan = await prisma.userMealPlan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserMealPlanUpdateManyArgs>(args: SelectSubset<T, UserMealPlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserMealPlans and returns the data updated in the database.
     * @param {UserMealPlanUpdateManyAndReturnArgs} args - Arguments to update many UserMealPlans.
     * @example
     * // Update many UserMealPlans
     * const userMealPlan = await prisma.userMealPlan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserMealPlans and only return the `id`
     * const userMealPlanWithIdOnly = await prisma.userMealPlan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserMealPlanUpdateManyAndReturnArgs>(args: SelectSubset<T, UserMealPlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserMealPlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserMealPlan.
     * @param {UserMealPlanUpsertArgs} args - Arguments to update or create a UserMealPlan.
     * @example
     * // Update or create a UserMealPlan
     * const userMealPlan = await prisma.userMealPlan.upsert({
     *   create: {
     *     // ... data to create a UserMealPlan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserMealPlan we want to update
     *   }
     * })
     */
    upsert<T extends UserMealPlanUpsertArgs>(args: SelectSubset<T, UserMealPlanUpsertArgs<ExtArgs>>): Prisma__UserMealPlanClient<$Result.GetResult<Prisma.$UserMealPlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserMealPlans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMealPlanCountArgs} args - Arguments to filter UserMealPlans to count.
     * @example
     * // Count the number of UserMealPlans
     * const count = await prisma.userMealPlan.count({
     *   where: {
     *     // ... the filter for the UserMealPlans we want to count
     *   }
     * })
    **/
    count<T extends UserMealPlanCountArgs>(
      args?: Subset<T, UserMealPlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserMealPlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserMealPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMealPlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserMealPlanAggregateArgs>(args: Subset<T, UserMealPlanAggregateArgs>): Prisma.PrismaPromise<GetUserMealPlanAggregateType<T>>

    /**
     * Group by UserMealPlan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserMealPlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserMealPlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserMealPlanGroupByArgs['orderBy'] }
        : { orderBy?: UserMealPlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserMealPlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserMealPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserMealPlan model
   */
  readonly fields: UserMealPlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserMealPlan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserMealPlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    mealPlanDishes<T extends UserMealPlan$mealPlanDishesArgs<ExtArgs> = {}>(args?: Subset<T, UserMealPlan$mealPlanDishesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPlanDishPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserMealPlan model
   */
  interface UserMealPlanFieldRefs {
    readonly id: FieldRef<"UserMealPlan", 'Int'>
    readonly userId: FieldRef<"UserMealPlan", 'Int'>
    readonly date: FieldRef<"UserMealPlan", 'DateTime'>
    readonly createdAt: FieldRef<"UserMealPlan", 'DateTime'>
    readonly updatedAt: FieldRef<"UserMealPlan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserMealPlan findUnique
   */
  export type UserMealPlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMealPlan
     */
    select?: UserMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMealPlan
     */
    omit?: UserMealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMealPlanInclude<ExtArgs> | null
    /**
     * Filter, which UserMealPlan to fetch.
     */
    where: UserMealPlanWhereUniqueInput
  }

  /**
   * UserMealPlan findUniqueOrThrow
   */
  export type UserMealPlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMealPlan
     */
    select?: UserMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMealPlan
     */
    omit?: UserMealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMealPlanInclude<ExtArgs> | null
    /**
     * Filter, which UserMealPlan to fetch.
     */
    where: UserMealPlanWhereUniqueInput
  }

  /**
   * UserMealPlan findFirst
   */
  export type UserMealPlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMealPlan
     */
    select?: UserMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMealPlan
     */
    omit?: UserMealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMealPlanInclude<ExtArgs> | null
    /**
     * Filter, which UserMealPlan to fetch.
     */
    where?: UserMealPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserMealPlans to fetch.
     */
    orderBy?: UserMealPlanOrderByWithRelationInput | UserMealPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserMealPlans.
     */
    cursor?: UserMealPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserMealPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserMealPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserMealPlans.
     */
    distinct?: UserMealPlanScalarFieldEnum | UserMealPlanScalarFieldEnum[]
  }

  /**
   * UserMealPlan findFirstOrThrow
   */
  export type UserMealPlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMealPlan
     */
    select?: UserMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMealPlan
     */
    omit?: UserMealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMealPlanInclude<ExtArgs> | null
    /**
     * Filter, which UserMealPlan to fetch.
     */
    where?: UserMealPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserMealPlans to fetch.
     */
    orderBy?: UserMealPlanOrderByWithRelationInput | UserMealPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserMealPlans.
     */
    cursor?: UserMealPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserMealPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserMealPlans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserMealPlans.
     */
    distinct?: UserMealPlanScalarFieldEnum | UserMealPlanScalarFieldEnum[]
  }

  /**
   * UserMealPlan findMany
   */
  export type UserMealPlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMealPlan
     */
    select?: UserMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMealPlan
     */
    omit?: UserMealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMealPlanInclude<ExtArgs> | null
    /**
     * Filter, which UserMealPlans to fetch.
     */
    where?: UserMealPlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserMealPlans to fetch.
     */
    orderBy?: UserMealPlanOrderByWithRelationInput | UserMealPlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserMealPlans.
     */
    cursor?: UserMealPlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserMealPlans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserMealPlans.
     */
    skip?: number
    distinct?: UserMealPlanScalarFieldEnum | UserMealPlanScalarFieldEnum[]
  }

  /**
   * UserMealPlan create
   */
  export type UserMealPlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMealPlan
     */
    select?: UserMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMealPlan
     */
    omit?: UserMealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMealPlanInclude<ExtArgs> | null
    /**
     * The data needed to create a UserMealPlan.
     */
    data: XOR<UserMealPlanCreateInput, UserMealPlanUncheckedCreateInput>
  }

  /**
   * UserMealPlan createMany
   */
  export type UserMealPlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserMealPlans.
     */
    data: UserMealPlanCreateManyInput | UserMealPlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserMealPlan createManyAndReturn
   */
  export type UserMealPlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMealPlan
     */
    select?: UserMealPlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserMealPlan
     */
    omit?: UserMealPlanOmit<ExtArgs> | null
    /**
     * The data used to create many UserMealPlans.
     */
    data: UserMealPlanCreateManyInput | UserMealPlanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMealPlanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserMealPlan update
   */
  export type UserMealPlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMealPlan
     */
    select?: UserMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMealPlan
     */
    omit?: UserMealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMealPlanInclude<ExtArgs> | null
    /**
     * The data needed to update a UserMealPlan.
     */
    data: XOR<UserMealPlanUpdateInput, UserMealPlanUncheckedUpdateInput>
    /**
     * Choose, which UserMealPlan to update.
     */
    where: UserMealPlanWhereUniqueInput
  }

  /**
   * UserMealPlan updateMany
   */
  export type UserMealPlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserMealPlans.
     */
    data: XOR<UserMealPlanUpdateManyMutationInput, UserMealPlanUncheckedUpdateManyInput>
    /**
     * Filter which UserMealPlans to update
     */
    where?: UserMealPlanWhereInput
    /**
     * Limit how many UserMealPlans to update.
     */
    limit?: number
  }

  /**
   * UserMealPlan updateManyAndReturn
   */
  export type UserMealPlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMealPlan
     */
    select?: UserMealPlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserMealPlan
     */
    omit?: UserMealPlanOmit<ExtArgs> | null
    /**
     * The data used to update UserMealPlans.
     */
    data: XOR<UserMealPlanUpdateManyMutationInput, UserMealPlanUncheckedUpdateManyInput>
    /**
     * Filter which UserMealPlans to update
     */
    where?: UserMealPlanWhereInput
    /**
     * Limit how many UserMealPlans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMealPlanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserMealPlan upsert
   */
  export type UserMealPlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMealPlan
     */
    select?: UserMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMealPlan
     */
    omit?: UserMealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMealPlanInclude<ExtArgs> | null
    /**
     * The filter to search for the UserMealPlan to update in case it exists.
     */
    where: UserMealPlanWhereUniqueInput
    /**
     * In case the UserMealPlan found by the `where` argument doesn't exist, create a new UserMealPlan with this data.
     */
    create: XOR<UserMealPlanCreateInput, UserMealPlanUncheckedCreateInput>
    /**
     * In case the UserMealPlan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserMealPlanUpdateInput, UserMealPlanUncheckedUpdateInput>
  }

  /**
   * UserMealPlan delete
   */
  export type UserMealPlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMealPlan
     */
    select?: UserMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMealPlan
     */
    omit?: UserMealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMealPlanInclude<ExtArgs> | null
    /**
     * Filter which UserMealPlan to delete.
     */
    where: UserMealPlanWhereUniqueInput
  }

  /**
   * UserMealPlan deleteMany
   */
  export type UserMealPlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserMealPlans to delete
     */
    where?: UserMealPlanWhereInput
    /**
     * Limit how many UserMealPlans to delete.
     */
    limit?: number
  }

  /**
   * UserMealPlan.mealPlanDishes
   */
  export type UserMealPlan$mealPlanDishesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanDish
     */
    select?: MealPlanDishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanDish
     */
    omit?: MealPlanDishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanDishInclude<ExtArgs> | null
    where?: MealPlanDishWhereInput
    orderBy?: MealPlanDishOrderByWithRelationInput | MealPlanDishOrderByWithRelationInput[]
    cursor?: MealPlanDishWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MealPlanDishScalarFieldEnum | MealPlanDishScalarFieldEnum[]
  }

  /**
   * UserMealPlan without action
   */
  export type UserMealPlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserMealPlan
     */
    select?: UserMealPlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserMealPlan
     */
    omit?: UserMealPlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserMealPlanInclude<ExtArgs> | null
  }


  /**
   * Model MealPlanDish
   */

  export type AggregateMealPlanDish = {
    _count: MealPlanDishCountAggregateOutputType | null
    _avg: MealPlanDishAvgAggregateOutputType | null
    _sum: MealPlanDishSumAggregateOutputType | null
    _min: MealPlanDishMinAggregateOutputType | null
    _max: MealPlanDishMaxAggregateOutputType | null
  }

  export type MealPlanDishAvgAggregateOutputType = {
    mealPlanId: number | null
    dishId: number | null
  }

  export type MealPlanDishSumAggregateOutputType = {
    mealPlanId: number | null
    dishId: number | null
  }

  export type MealPlanDishMinAggregateOutputType = {
    mealPlanId: number | null
    dishId: number | null
  }

  export type MealPlanDishMaxAggregateOutputType = {
    mealPlanId: number | null
    dishId: number | null
  }

  export type MealPlanDishCountAggregateOutputType = {
    mealPlanId: number
    dishId: number
    _all: number
  }


  export type MealPlanDishAvgAggregateInputType = {
    mealPlanId?: true
    dishId?: true
  }

  export type MealPlanDishSumAggregateInputType = {
    mealPlanId?: true
    dishId?: true
  }

  export type MealPlanDishMinAggregateInputType = {
    mealPlanId?: true
    dishId?: true
  }

  export type MealPlanDishMaxAggregateInputType = {
    mealPlanId?: true
    dishId?: true
  }

  export type MealPlanDishCountAggregateInputType = {
    mealPlanId?: true
    dishId?: true
    _all?: true
  }

  export type MealPlanDishAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MealPlanDish to aggregate.
     */
    where?: MealPlanDishWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealPlanDishes to fetch.
     */
    orderBy?: MealPlanDishOrderByWithRelationInput | MealPlanDishOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MealPlanDishWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealPlanDishes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealPlanDishes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MealPlanDishes
    **/
    _count?: true | MealPlanDishCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MealPlanDishAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MealPlanDishSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MealPlanDishMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MealPlanDishMaxAggregateInputType
  }

  export type GetMealPlanDishAggregateType<T extends MealPlanDishAggregateArgs> = {
        [P in keyof T & keyof AggregateMealPlanDish]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMealPlanDish[P]>
      : GetScalarType<T[P], AggregateMealPlanDish[P]>
  }




  export type MealPlanDishGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MealPlanDishWhereInput
    orderBy?: MealPlanDishOrderByWithAggregationInput | MealPlanDishOrderByWithAggregationInput[]
    by: MealPlanDishScalarFieldEnum[] | MealPlanDishScalarFieldEnum
    having?: MealPlanDishScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MealPlanDishCountAggregateInputType | true
    _avg?: MealPlanDishAvgAggregateInputType
    _sum?: MealPlanDishSumAggregateInputType
    _min?: MealPlanDishMinAggregateInputType
    _max?: MealPlanDishMaxAggregateInputType
  }

  export type MealPlanDishGroupByOutputType = {
    mealPlanId: number
    dishId: number
    _count: MealPlanDishCountAggregateOutputType | null
    _avg: MealPlanDishAvgAggregateOutputType | null
    _sum: MealPlanDishSumAggregateOutputType | null
    _min: MealPlanDishMinAggregateOutputType | null
    _max: MealPlanDishMaxAggregateOutputType | null
  }

  type GetMealPlanDishGroupByPayload<T extends MealPlanDishGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MealPlanDishGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MealPlanDishGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MealPlanDishGroupByOutputType[P]>
            : GetScalarType<T[P], MealPlanDishGroupByOutputType[P]>
        }
      >
    >


  export type MealPlanDishSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    mealPlanId?: boolean
    dishId?: boolean
    mealPlan?: boolean | UserMealPlanDefaultArgs<ExtArgs>
    dish?: boolean | DishDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mealPlanDish"]>

  export type MealPlanDishSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    mealPlanId?: boolean
    dishId?: boolean
    mealPlan?: boolean | UserMealPlanDefaultArgs<ExtArgs>
    dish?: boolean | DishDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mealPlanDish"]>

  export type MealPlanDishSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    mealPlanId?: boolean
    dishId?: boolean
    mealPlan?: boolean | UserMealPlanDefaultArgs<ExtArgs>
    dish?: boolean | DishDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mealPlanDish"]>

  export type MealPlanDishSelectScalar = {
    mealPlanId?: boolean
    dishId?: boolean
  }

  export type MealPlanDishOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"mealPlanId" | "dishId", ExtArgs["result"]["mealPlanDish"]>
  export type MealPlanDishInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mealPlan?: boolean | UserMealPlanDefaultArgs<ExtArgs>
    dish?: boolean | DishDefaultArgs<ExtArgs>
  }
  export type MealPlanDishIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mealPlan?: boolean | UserMealPlanDefaultArgs<ExtArgs>
    dish?: boolean | DishDefaultArgs<ExtArgs>
  }
  export type MealPlanDishIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mealPlan?: boolean | UserMealPlanDefaultArgs<ExtArgs>
    dish?: boolean | DishDefaultArgs<ExtArgs>
  }

  export type $MealPlanDishPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MealPlanDish"
    objects: {
      mealPlan: Prisma.$UserMealPlanPayload<ExtArgs>
      dish: Prisma.$DishPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      mealPlanId: number
      dishId: number
    }, ExtArgs["result"]["mealPlanDish"]>
    composites: {}
  }

  type MealPlanDishGetPayload<S extends boolean | null | undefined | MealPlanDishDefaultArgs> = $Result.GetResult<Prisma.$MealPlanDishPayload, S>

  type MealPlanDishCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MealPlanDishFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MealPlanDishCountAggregateInputType | true
    }

  export interface MealPlanDishDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MealPlanDish'], meta: { name: 'MealPlanDish' } }
    /**
     * Find zero or one MealPlanDish that matches the filter.
     * @param {MealPlanDishFindUniqueArgs} args - Arguments to find a MealPlanDish
     * @example
     * // Get one MealPlanDish
     * const mealPlanDish = await prisma.mealPlanDish.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MealPlanDishFindUniqueArgs>(args: SelectSubset<T, MealPlanDishFindUniqueArgs<ExtArgs>>): Prisma__MealPlanDishClient<$Result.GetResult<Prisma.$MealPlanDishPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MealPlanDish that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MealPlanDishFindUniqueOrThrowArgs} args - Arguments to find a MealPlanDish
     * @example
     * // Get one MealPlanDish
     * const mealPlanDish = await prisma.mealPlanDish.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MealPlanDishFindUniqueOrThrowArgs>(args: SelectSubset<T, MealPlanDishFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MealPlanDishClient<$Result.GetResult<Prisma.$MealPlanDishPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MealPlanDish that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanDishFindFirstArgs} args - Arguments to find a MealPlanDish
     * @example
     * // Get one MealPlanDish
     * const mealPlanDish = await prisma.mealPlanDish.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MealPlanDishFindFirstArgs>(args?: SelectSubset<T, MealPlanDishFindFirstArgs<ExtArgs>>): Prisma__MealPlanDishClient<$Result.GetResult<Prisma.$MealPlanDishPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MealPlanDish that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanDishFindFirstOrThrowArgs} args - Arguments to find a MealPlanDish
     * @example
     * // Get one MealPlanDish
     * const mealPlanDish = await prisma.mealPlanDish.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MealPlanDishFindFirstOrThrowArgs>(args?: SelectSubset<T, MealPlanDishFindFirstOrThrowArgs<ExtArgs>>): Prisma__MealPlanDishClient<$Result.GetResult<Prisma.$MealPlanDishPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MealPlanDishes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanDishFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MealPlanDishes
     * const mealPlanDishes = await prisma.mealPlanDish.findMany()
     * 
     * // Get first 10 MealPlanDishes
     * const mealPlanDishes = await prisma.mealPlanDish.findMany({ take: 10 })
     * 
     * // Only select the `mealPlanId`
     * const mealPlanDishWithMealPlanIdOnly = await prisma.mealPlanDish.findMany({ select: { mealPlanId: true } })
     * 
     */
    findMany<T extends MealPlanDishFindManyArgs>(args?: SelectSubset<T, MealPlanDishFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPlanDishPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MealPlanDish.
     * @param {MealPlanDishCreateArgs} args - Arguments to create a MealPlanDish.
     * @example
     * // Create one MealPlanDish
     * const MealPlanDish = await prisma.mealPlanDish.create({
     *   data: {
     *     // ... data to create a MealPlanDish
     *   }
     * })
     * 
     */
    create<T extends MealPlanDishCreateArgs>(args: SelectSubset<T, MealPlanDishCreateArgs<ExtArgs>>): Prisma__MealPlanDishClient<$Result.GetResult<Prisma.$MealPlanDishPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MealPlanDishes.
     * @param {MealPlanDishCreateManyArgs} args - Arguments to create many MealPlanDishes.
     * @example
     * // Create many MealPlanDishes
     * const mealPlanDish = await prisma.mealPlanDish.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MealPlanDishCreateManyArgs>(args?: SelectSubset<T, MealPlanDishCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MealPlanDishes and returns the data saved in the database.
     * @param {MealPlanDishCreateManyAndReturnArgs} args - Arguments to create many MealPlanDishes.
     * @example
     * // Create many MealPlanDishes
     * const mealPlanDish = await prisma.mealPlanDish.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MealPlanDishes and only return the `mealPlanId`
     * const mealPlanDishWithMealPlanIdOnly = await prisma.mealPlanDish.createManyAndReturn({
     *   select: { mealPlanId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MealPlanDishCreateManyAndReturnArgs>(args?: SelectSubset<T, MealPlanDishCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPlanDishPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MealPlanDish.
     * @param {MealPlanDishDeleteArgs} args - Arguments to delete one MealPlanDish.
     * @example
     * // Delete one MealPlanDish
     * const MealPlanDish = await prisma.mealPlanDish.delete({
     *   where: {
     *     // ... filter to delete one MealPlanDish
     *   }
     * })
     * 
     */
    delete<T extends MealPlanDishDeleteArgs>(args: SelectSubset<T, MealPlanDishDeleteArgs<ExtArgs>>): Prisma__MealPlanDishClient<$Result.GetResult<Prisma.$MealPlanDishPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MealPlanDish.
     * @param {MealPlanDishUpdateArgs} args - Arguments to update one MealPlanDish.
     * @example
     * // Update one MealPlanDish
     * const mealPlanDish = await prisma.mealPlanDish.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MealPlanDishUpdateArgs>(args: SelectSubset<T, MealPlanDishUpdateArgs<ExtArgs>>): Prisma__MealPlanDishClient<$Result.GetResult<Prisma.$MealPlanDishPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MealPlanDishes.
     * @param {MealPlanDishDeleteManyArgs} args - Arguments to filter MealPlanDishes to delete.
     * @example
     * // Delete a few MealPlanDishes
     * const { count } = await prisma.mealPlanDish.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MealPlanDishDeleteManyArgs>(args?: SelectSubset<T, MealPlanDishDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MealPlanDishes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanDishUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MealPlanDishes
     * const mealPlanDish = await prisma.mealPlanDish.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MealPlanDishUpdateManyArgs>(args: SelectSubset<T, MealPlanDishUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MealPlanDishes and returns the data updated in the database.
     * @param {MealPlanDishUpdateManyAndReturnArgs} args - Arguments to update many MealPlanDishes.
     * @example
     * // Update many MealPlanDishes
     * const mealPlanDish = await prisma.mealPlanDish.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MealPlanDishes and only return the `mealPlanId`
     * const mealPlanDishWithMealPlanIdOnly = await prisma.mealPlanDish.updateManyAndReturn({
     *   select: { mealPlanId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MealPlanDishUpdateManyAndReturnArgs>(args: SelectSubset<T, MealPlanDishUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MealPlanDishPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MealPlanDish.
     * @param {MealPlanDishUpsertArgs} args - Arguments to update or create a MealPlanDish.
     * @example
     * // Update or create a MealPlanDish
     * const mealPlanDish = await prisma.mealPlanDish.upsert({
     *   create: {
     *     // ... data to create a MealPlanDish
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MealPlanDish we want to update
     *   }
     * })
     */
    upsert<T extends MealPlanDishUpsertArgs>(args: SelectSubset<T, MealPlanDishUpsertArgs<ExtArgs>>): Prisma__MealPlanDishClient<$Result.GetResult<Prisma.$MealPlanDishPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MealPlanDishes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanDishCountArgs} args - Arguments to filter MealPlanDishes to count.
     * @example
     * // Count the number of MealPlanDishes
     * const count = await prisma.mealPlanDish.count({
     *   where: {
     *     // ... the filter for the MealPlanDishes we want to count
     *   }
     * })
    **/
    count<T extends MealPlanDishCountArgs>(
      args?: Subset<T, MealPlanDishCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MealPlanDishCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MealPlanDish.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanDishAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MealPlanDishAggregateArgs>(args: Subset<T, MealPlanDishAggregateArgs>): Prisma.PrismaPromise<GetMealPlanDishAggregateType<T>>

    /**
     * Group by MealPlanDish.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MealPlanDishGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MealPlanDishGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MealPlanDishGroupByArgs['orderBy'] }
        : { orderBy?: MealPlanDishGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MealPlanDishGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMealPlanDishGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MealPlanDish model
   */
  readonly fields: MealPlanDishFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MealPlanDish.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MealPlanDishClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mealPlan<T extends UserMealPlanDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserMealPlanDefaultArgs<ExtArgs>>): Prisma__UserMealPlanClient<$Result.GetResult<Prisma.$UserMealPlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    dish<T extends DishDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DishDefaultArgs<ExtArgs>>): Prisma__DishClient<$Result.GetResult<Prisma.$DishPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MealPlanDish model
   */
  interface MealPlanDishFieldRefs {
    readonly mealPlanId: FieldRef<"MealPlanDish", 'Int'>
    readonly dishId: FieldRef<"MealPlanDish", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * MealPlanDish findUnique
   */
  export type MealPlanDishFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanDish
     */
    select?: MealPlanDishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanDish
     */
    omit?: MealPlanDishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanDishInclude<ExtArgs> | null
    /**
     * Filter, which MealPlanDish to fetch.
     */
    where: MealPlanDishWhereUniqueInput
  }

  /**
   * MealPlanDish findUniqueOrThrow
   */
  export type MealPlanDishFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanDish
     */
    select?: MealPlanDishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanDish
     */
    omit?: MealPlanDishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanDishInclude<ExtArgs> | null
    /**
     * Filter, which MealPlanDish to fetch.
     */
    where: MealPlanDishWhereUniqueInput
  }

  /**
   * MealPlanDish findFirst
   */
  export type MealPlanDishFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanDish
     */
    select?: MealPlanDishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanDish
     */
    omit?: MealPlanDishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanDishInclude<ExtArgs> | null
    /**
     * Filter, which MealPlanDish to fetch.
     */
    where?: MealPlanDishWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealPlanDishes to fetch.
     */
    orderBy?: MealPlanDishOrderByWithRelationInput | MealPlanDishOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MealPlanDishes.
     */
    cursor?: MealPlanDishWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealPlanDishes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealPlanDishes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MealPlanDishes.
     */
    distinct?: MealPlanDishScalarFieldEnum | MealPlanDishScalarFieldEnum[]
  }

  /**
   * MealPlanDish findFirstOrThrow
   */
  export type MealPlanDishFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanDish
     */
    select?: MealPlanDishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanDish
     */
    omit?: MealPlanDishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanDishInclude<ExtArgs> | null
    /**
     * Filter, which MealPlanDish to fetch.
     */
    where?: MealPlanDishWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealPlanDishes to fetch.
     */
    orderBy?: MealPlanDishOrderByWithRelationInput | MealPlanDishOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MealPlanDishes.
     */
    cursor?: MealPlanDishWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealPlanDishes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealPlanDishes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MealPlanDishes.
     */
    distinct?: MealPlanDishScalarFieldEnum | MealPlanDishScalarFieldEnum[]
  }

  /**
   * MealPlanDish findMany
   */
  export type MealPlanDishFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanDish
     */
    select?: MealPlanDishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanDish
     */
    omit?: MealPlanDishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanDishInclude<ExtArgs> | null
    /**
     * Filter, which MealPlanDishes to fetch.
     */
    where?: MealPlanDishWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MealPlanDishes to fetch.
     */
    orderBy?: MealPlanDishOrderByWithRelationInput | MealPlanDishOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MealPlanDishes.
     */
    cursor?: MealPlanDishWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MealPlanDishes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MealPlanDishes.
     */
    skip?: number
    distinct?: MealPlanDishScalarFieldEnum | MealPlanDishScalarFieldEnum[]
  }

  /**
   * MealPlanDish create
   */
  export type MealPlanDishCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanDish
     */
    select?: MealPlanDishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanDish
     */
    omit?: MealPlanDishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanDishInclude<ExtArgs> | null
    /**
     * The data needed to create a MealPlanDish.
     */
    data: XOR<MealPlanDishCreateInput, MealPlanDishUncheckedCreateInput>
  }

  /**
   * MealPlanDish createMany
   */
  export type MealPlanDishCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MealPlanDishes.
     */
    data: MealPlanDishCreateManyInput | MealPlanDishCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MealPlanDish createManyAndReturn
   */
  export type MealPlanDishCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanDish
     */
    select?: MealPlanDishSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanDish
     */
    omit?: MealPlanDishOmit<ExtArgs> | null
    /**
     * The data used to create many MealPlanDishes.
     */
    data: MealPlanDishCreateManyInput | MealPlanDishCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanDishIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MealPlanDish update
   */
  export type MealPlanDishUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanDish
     */
    select?: MealPlanDishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanDish
     */
    omit?: MealPlanDishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanDishInclude<ExtArgs> | null
    /**
     * The data needed to update a MealPlanDish.
     */
    data: XOR<MealPlanDishUpdateInput, MealPlanDishUncheckedUpdateInput>
    /**
     * Choose, which MealPlanDish to update.
     */
    where: MealPlanDishWhereUniqueInput
  }

  /**
   * MealPlanDish updateMany
   */
  export type MealPlanDishUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MealPlanDishes.
     */
    data: XOR<MealPlanDishUpdateManyMutationInput, MealPlanDishUncheckedUpdateManyInput>
    /**
     * Filter which MealPlanDishes to update
     */
    where?: MealPlanDishWhereInput
    /**
     * Limit how many MealPlanDishes to update.
     */
    limit?: number
  }

  /**
   * MealPlanDish updateManyAndReturn
   */
  export type MealPlanDishUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanDish
     */
    select?: MealPlanDishSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanDish
     */
    omit?: MealPlanDishOmit<ExtArgs> | null
    /**
     * The data used to update MealPlanDishes.
     */
    data: XOR<MealPlanDishUpdateManyMutationInput, MealPlanDishUncheckedUpdateManyInput>
    /**
     * Filter which MealPlanDishes to update
     */
    where?: MealPlanDishWhereInput
    /**
     * Limit how many MealPlanDishes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanDishIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MealPlanDish upsert
   */
  export type MealPlanDishUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanDish
     */
    select?: MealPlanDishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanDish
     */
    omit?: MealPlanDishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanDishInclude<ExtArgs> | null
    /**
     * The filter to search for the MealPlanDish to update in case it exists.
     */
    where: MealPlanDishWhereUniqueInput
    /**
     * In case the MealPlanDish found by the `where` argument doesn't exist, create a new MealPlanDish with this data.
     */
    create: XOR<MealPlanDishCreateInput, MealPlanDishUncheckedCreateInput>
    /**
     * In case the MealPlanDish was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MealPlanDishUpdateInput, MealPlanDishUncheckedUpdateInput>
  }

  /**
   * MealPlanDish delete
   */
  export type MealPlanDishDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanDish
     */
    select?: MealPlanDishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanDish
     */
    omit?: MealPlanDishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanDishInclude<ExtArgs> | null
    /**
     * Filter which MealPlanDish to delete.
     */
    where: MealPlanDishWhereUniqueInput
  }

  /**
   * MealPlanDish deleteMany
   */
  export type MealPlanDishDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MealPlanDishes to delete
     */
    where?: MealPlanDishWhereInput
    /**
     * Limit how many MealPlanDishes to delete.
     */
    limit?: number
  }

  /**
   * MealPlanDish without action
   */
  export type MealPlanDishDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MealPlanDish
     */
    select?: MealPlanDishSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MealPlanDish
     */
    omit?: MealPlanDishOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MealPlanDishInclude<ExtArgs> | null
  }


  /**
   * Model UserCalorieLog
   */

  export type AggregateUserCalorieLog = {
    _count: UserCalorieLogCountAggregateOutputType | null
    _avg: UserCalorieLogAvgAggregateOutputType | null
    _sum: UserCalorieLogSumAggregateOutputType | null
    _min: UserCalorieLogMinAggregateOutputType | null
    _max: UserCalorieLogMaxAggregateOutputType | null
  }

  export type UserCalorieLogAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    calories: number | null
  }

  export type UserCalorieLogSumAggregateOutputType = {
    id: number | null
    userId: number | null
    calories: number | null
  }

  export type UserCalorieLogMinAggregateOutputType = {
    id: number | null
    userId: number | null
    date: Date | null
    calories: number | null
    createdAt: Date | null
  }

  export type UserCalorieLogMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    date: Date | null
    calories: number | null
    createdAt: Date | null
  }

  export type UserCalorieLogCountAggregateOutputType = {
    id: number
    userId: number
    date: number
    calories: number
    createdAt: number
    _all: number
  }


  export type UserCalorieLogAvgAggregateInputType = {
    id?: true
    userId?: true
    calories?: true
  }

  export type UserCalorieLogSumAggregateInputType = {
    id?: true
    userId?: true
    calories?: true
  }

  export type UserCalorieLogMinAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    calories?: true
    createdAt?: true
  }

  export type UserCalorieLogMaxAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    calories?: true
    createdAt?: true
  }

  export type UserCalorieLogCountAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    calories?: true
    createdAt?: true
    _all?: true
  }

  export type UserCalorieLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCalorieLog to aggregate.
     */
    where?: UserCalorieLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCalorieLogs to fetch.
     */
    orderBy?: UserCalorieLogOrderByWithRelationInput | UserCalorieLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserCalorieLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCalorieLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCalorieLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserCalorieLogs
    **/
    _count?: true | UserCalorieLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserCalorieLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserCalorieLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserCalorieLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserCalorieLogMaxAggregateInputType
  }

  export type GetUserCalorieLogAggregateType<T extends UserCalorieLogAggregateArgs> = {
        [P in keyof T & keyof AggregateUserCalorieLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserCalorieLog[P]>
      : GetScalarType<T[P], AggregateUserCalorieLog[P]>
  }




  export type UserCalorieLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCalorieLogWhereInput
    orderBy?: UserCalorieLogOrderByWithAggregationInput | UserCalorieLogOrderByWithAggregationInput[]
    by: UserCalorieLogScalarFieldEnum[] | UserCalorieLogScalarFieldEnum
    having?: UserCalorieLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCalorieLogCountAggregateInputType | true
    _avg?: UserCalorieLogAvgAggregateInputType
    _sum?: UserCalorieLogSumAggregateInputType
    _min?: UserCalorieLogMinAggregateInputType
    _max?: UserCalorieLogMaxAggregateInputType
  }

  export type UserCalorieLogGroupByOutputType = {
    id: number
    userId: number
    date: Date
    calories: number
    createdAt: Date
    _count: UserCalorieLogCountAggregateOutputType | null
    _avg: UserCalorieLogAvgAggregateOutputType | null
    _sum: UserCalorieLogSumAggregateOutputType | null
    _min: UserCalorieLogMinAggregateOutputType | null
    _max: UserCalorieLogMaxAggregateOutputType | null
  }

  type GetUserCalorieLogGroupByPayload<T extends UserCalorieLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserCalorieLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserCalorieLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserCalorieLogGroupByOutputType[P]>
            : GetScalarType<T[P], UserCalorieLogGroupByOutputType[P]>
        }
      >
    >


  export type UserCalorieLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    calories?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCalorieLog"]>

  export type UserCalorieLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    calories?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCalorieLog"]>

  export type UserCalorieLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    calories?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCalorieLog"]>

  export type UserCalorieLogSelectScalar = {
    id?: boolean
    userId?: boolean
    date?: boolean
    calories?: boolean
    createdAt?: boolean
  }

  export type UserCalorieLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "date" | "calories" | "createdAt", ExtArgs["result"]["userCalorieLog"]>
  export type UserCalorieLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserCalorieLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserCalorieLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserCalorieLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserCalorieLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      date: Date
      calories: number
      createdAt: Date
    }, ExtArgs["result"]["userCalorieLog"]>
    composites: {}
  }

  type UserCalorieLogGetPayload<S extends boolean | null | undefined | UserCalorieLogDefaultArgs> = $Result.GetResult<Prisma.$UserCalorieLogPayload, S>

  type UserCalorieLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserCalorieLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCalorieLogCountAggregateInputType | true
    }

  export interface UserCalorieLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserCalorieLog'], meta: { name: 'UserCalorieLog' } }
    /**
     * Find zero or one UserCalorieLog that matches the filter.
     * @param {UserCalorieLogFindUniqueArgs} args - Arguments to find a UserCalorieLog
     * @example
     * // Get one UserCalorieLog
     * const userCalorieLog = await prisma.userCalorieLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserCalorieLogFindUniqueArgs>(args: SelectSubset<T, UserCalorieLogFindUniqueArgs<ExtArgs>>): Prisma__UserCalorieLogClient<$Result.GetResult<Prisma.$UserCalorieLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserCalorieLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserCalorieLogFindUniqueOrThrowArgs} args - Arguments to find a UserCalorieLog
     * @example
     * // Get one UserCalorieLog
     * const userCalorieLog = await prisma.userCalorieLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserCalorieLogFindUniqueOrThrowArgs>(args: SelectSubset<T, UserCalorieLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserCalorieLogClient<$Result.GetResult<Prisma.$UserCalorieLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserCalorieLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCalorieLogFindFirstArgs} args - Arguments to find a UserCalorieLog
     * @example
     * // Get one UserCalorieLog
     * const userCalorieLog = await prisma.userCalorieLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserCalorieLogFindFirstArgs>(args?: SelectSubset<T, UserCalorieLogFindFirstArgs<ExtArgs>>): Prisma__UserCalorieLogClient<$Result.GetResult<Prisma.$UserCalorieLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserCalorieLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCalorieLogFindFirstOrThrowArgs} args - Arguments to find a UserCalorieLog
     * @example
     * // Get one UserCalorieLog
     * const userCalorieLog = await prisma.userCalorieLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserCalorieLogFindFirstOrThrowArgs>(args?: SelectSubset<T, UserCalorieLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserCalorieLogClient<$Result.GetResult<Prisma.$UserCalorieLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserCalorieLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCalorieLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserCalorieLogs
     * const userCalorieLogs = await prisma.userCalorieLog.findMany()
     * 
     * // Get first 10 UserCalorieLogs
     * const userCalorieLogs = await prisma.userCalorieLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userCalorieLogWithIdOnly = await prisma.userCalorieLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserCalorieLogFindManyArgs>(args?: SelectSubset<T, UserCalorieLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCalorieLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserCalorieLog.
     * @param {UserCalorieLogCreateArgs} args - Arguments to create a UserCalorieLog.
     * @example
     * // Create one UserCalorieLog
     * const UserCalorieLog = await prisma.userCalorieLog.create({
     *   data: {
     *     // ... data to create a UserCalorieLog
     *   }
     * })
     * 
     */
    create<T extends UserCalorieLogCreateArgs>(args: SelectSubset<T, UserCalorieLogCreateArgs<ExtArgs>>): Prisma__UserCalorieLogClient<$Result.GetResult<Prisma.$UserCalorieLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserCalorieLogs.
     * @param {UserCalorieLogCreateManyArgs} args - Arguments to create many UserCalorieLogs.
     * @example
     * // Create many UserCalorieLogs
     * const userCalorieLog = await prisma.userCalorieLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCalorieLogCreateManyArgs>(args?: SelectSubset<T, UserCalorieLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserCalorieLogs and returns the data saved in the database.
     * @param {UserCalorieLogCreateManyAndReturnArgs} args - Arguments to create many UserCalorieLogs.
     * @example
     * // Create many UserCalorieLogs
     * const userCalorieLog = await prisma.userCalorieLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserCalorieLogs and only return the `id`
     * const userCalorieLogWithIdOnly = await prisma.userCalorieLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCalorieLogCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCalorieLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCalorieLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserCalorieLog.
     * @param {UserCalorieLogDeleteArgs} args - Arguments to delete one UserCalorieLog.
     * @example
     * // Delete one UserCalorieLog
     * const UserCalorieLog = await prisma.userCalorieLog.delete({
     *   where: {
     *     // ... filter to delete one UserCalorieLog
     *   }
     * })
     * 
     */
    delete<T extends UserCalorieLogDeleteArgs>(args: SelectSubset<T, UserCalorieLogDeleteArgs<ExtArgs>>): Prisma__UserCalorieLogClient<$Result.GetResult<Prisma.$UserCalorieLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserCalorieLog.
     * @param {UserCalorieLogUpdateArgs} args - Arguments to update one UserCalorieLog.
     * @example
     * // Update one UserCalorieLog
     * const userCalorieLog = await prisma.userCalorieLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserCalorieLogUpdateArgs>(args: SelectSubset<T, UserCalorieLogUpdateArgs<ExtArgs>>): Prisma__UserCalorieLogClient<$Result.GetResult<Prisma.$UserCalorieLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserCalorieLogs.
     * @param {UserCalorieLogDeleteManyArgs} args - Arguments to filter UserCalorieLogs to delete.
     * @example
     * // Delete a few UserCalorieLogs
     * const { count } = await prisma.userCalorieLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserCalorieLogDeleteManyArgs>(args?: SelectSubset<T, UserCalorieLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserCalorieLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCalorieLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserCalorieLogs
     * const userCalorieLog = await prisma.userCalorieLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserCalorieLogUpdateManyArgs>(args: SelectSubset<T, UserCalorieLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserCalorieLogs and returns the data updated in the database.
     * @param {UserCalorieLogUpdateManyAndReturnArgs} args - Arguments to update many UserCalorieLogs.
     * @example
     * // Update many UserCalorieLogs
     * const userCalorieLog = await prisma.userCalorieLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserCalorieLogs and only return the `id`
     * const userCalorieLogWithIdOnly = await prisma.userCalorieLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserCalorieLogUpdateManyAndReturnArgs>(args: SelectSubset<T, UserCalorieLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCalorieLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserCalorieLog.
     * @param {UserCalorieLogUpsertArgs} args - Arguments to update or create a UserCalorieLog.
     * @example
     * // Update or create a UserCalorieLog
     * const userCalorieLog = await prisma.userCalorieLog.upsert({
     *   create: {
     *     // ... data to create a UserCalorieLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserCalorieLog we want to update
     *   }
     * })
     */
    upsert<T extends UserCalorieLogUpsertArgs>(args: SelectSubset<T, UserCalorieLogUpsertArgs<ExtArgs>>): Prisma__UserCalorieLogClient<$Result.GetResult<Prisma.$UserCalorieLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserCalorieLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCalorieLogCountArgs} args - Arguments to filter UserCalorieLogs to count.
     * @example
     * // Count the number of UserCalorieLogs
     * const count = await prisma.userCalorieLog.count({
     *   where: {
     *     // ... the filter for the UserCalorieLogs we want to count
     *   }
     * })
    **/
    count<T extends UserCalorieLogCountArgs>(
      args?: Subset<T, UserCalorieLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCalorieLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserCalorieLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCalorieLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserCalorieLogAggregateArgs>(args: Subset<T, UserCalorieLogAggregateArgs>): Prisma.PrismaPromise<GetUserCalorieLogAggregateType<T>>

    /**
     * Group by UserCalorieLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCalorieLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserCalorieLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserCalorieLogGroupByArgs['orderBy'] }
        : { orderBy?: UserCalorieLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserCalorieLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserCalorieLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserCalorieLog model
   */
  readonly fields: UserCalorieLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserCalorieLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserCalorieLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserCalorieLog model
   */
  interface UserCalorieLogFieldRefs {
    readonly id: FieldRef<"UserCalorieLog", 'Int'>
    readonly userId: FieldRef<"UserCalorieLog", 'Int'>
    readonly date: FieldRef<"UserCalorieLog", 'DateTime'>
    readonly calories: FieldRef<"UserCalorieLog", 'Int'>
    readonly createdAt: FieldRef<"UserCalorieLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserCalorieLog findUnique
   */
  export type UserCalorieLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCalorieLog
     */
    select?: UserCalorieLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCalorieLog
     */
    omit?: UserCalorieLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCalorieLogInclude<ExtArgs> | null
    /**
     * Filter, which UserCalorieLog to fetch.
     */
    where: UserCalorieLogWhereUniqueInput
  }

  /**
   * UserCalorieLog findUniqueOrThrow
   */
  export type UserCalorieLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCalorieLog
     */
    select?: UserCalorieLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCalorieLog
     */
    omit?: UserCalorieLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCalorieLogInclude<ExtArgs> | null
    /**
     * Filter, which UserCalorieLog to fetch.
     */
    where: UserCalorieLogWhereUniqueInput
  }

  /**
   * UserCalorieLog findFirst
   */
  export type UserCalorieLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCalorieLog
     */
    select?: UserCalorieLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCalorieLog
     */
    omit?: UserCalorieLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCalorieLogInclude<ExtArgs> | null
    /**
     * Filter, which UserCalorieLog to fetch.
     */
    where?: UserCalorieLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCalorieLogs to fetch.
     */
    orderBy?: UserCalorieLogOrderByWithRelationInput | UserCalorieLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCalorieLogs.
     */
    cursor?: UserCalorieLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCalorieLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCalorieLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCalorieLogs.
     */
    distinct?: UserCalorieLogScalarFieldEnum | UserCalorieLogScalarFieldEnum[]
  }

  /**
   * UserCalorieLog findFirstOrThrow
   */
  export type UserCalorieLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCalorieLog
     */
    select?: UserCalorieLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCalorieLog
     */
    omit?: UserCalorieLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCalorieLogInclude<ExtArgs> | null
    /**
     * Filter, which UserCalorieLog to fetch.
     */
    where?: UserCalorieLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCalorieLogs to fetch.
     */
    orderBy?: UserCalorieLogOrderByWithRelationInput | UserCalorieLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCalorieLogs.
     */
    cursor?: UserCalorieLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCalorieLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCalorieLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCalorieLogs.
     */
    distinct?: UserCalorieLogScalarFieldEnum | UserCalorieLogScalarFieldEnum[]
  }

  /**
   * UserCalorieLog findMany
   */
  export type UserCalorieLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCalorieLog
     */
    select?: UserCalorieLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCalorieLog
     */
    omit?: UserCalorieLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCalorieLogInclude<ExtArgs> | null
    /**
     * Filter, which UserCalorieLogs to fetch.
     */
    where?: UserCalorieLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCalorieLogs to fetch.
     */
    orderBy?: UserCalorieLogOrderByWithRelationInput | UserCalorieLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserCalorieLogs.
     */
    cursor?: UserCalorieLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCalorieLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCalorieLogs.
     */
    skip?: number
    distinct?: UserCalorieLogScalarFieldEnum | UserCalorieLogScalarFieldEnum[]
  }

  /**
   * UserCalorieLog create
   */
  export type UserCalorieLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCalorieLog
     */
    select?: UserCalorieLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCalorieLog
     */
    omit?: UserCalorieLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCalorieLogInclude<ExtArgs> | null
    /**
     * The data needed to create a UserCalorieLog.
     */
    data: XOR<UserCalorieLogCreateInput, UserCalorieLogUncheckedCreateInput>
  }

  /**
   * UserCalorieLog createMany
   */
  export type UserCalorieLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserCalorieLogs.
     */
    data: UserCalorieLogCreateManyInput | UserCalorieLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserCalorieLog createManyAndReturn
   */
  export type UserCalorieLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCalorieLog
     */
    select?: UserCalorieLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserCalorieLog
     */
    omit?: UserCalorieLogOmit<ExtArgs> | null
    /**
     * The data used to create many UserCalorieLogs.
     */
    data: UserCalorieLogCreateManyInput | UserCalorieLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCalorieLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserCalorieLog update
   */
  export type UserCalorieLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCalorieLog
     */
    select?: UserCalorieLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCalorieLog
     */
    omit?: UserCalorieLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCalorieLogInclude<ExtArgs> | null
    /**
     * The data needed to update a UserCalorieLog.
     */
    data: XOR<UserCalorieLogUpdateInput, UserCalorieLogUncheckedUpdateInput>
    /**
     * Choose, which UserCalorieLog to update.
     */
    where: UserCalorieLogWhereUniqueInput
  }

  /**
   * UserCalorieLog updateMany
   */
  export type UserCalorieLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserCalorieLogs.
     */
    data: XOR<UserCalorieLogUpdateManyMutationInput, UserCalorieLogUncheckedUpdateManyInput>
    /**
     * Filter which UserCalorieLogs to update
     */
    where?: UserCalorieLogWhereInput
    /**
     * Limit how many UserCalorieLogs to update.
     */
    limit?: number
  }

  /**
   * UserCalorieLog updateManyAndReturn
   */
  export type UserCalorieLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCalorieLog
     */
    select?: UserCalorieLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserCalorieLog
     */
    omit?: UserCalorieLogOmit<ExtArgs> | null
    /**
     * The data used to update UserCalorieLogs.
     */
    data: XOR<UserCalorieLogUpdateManyMutationInput, UserCalorieLogUncheckedUpdateManyInput>
    /**
     * Filter which UserCalorieLogs to update
     */
    where?: UserCalorieLogWhereInput
    /**
     * Limit how many UserCalorieLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCalorieLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserCalorieLog upsert
   */
  export type UserCalorieLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCalorieLog
     */
    select?: UserCalorieLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCalorieLog
     */
    omit?: UserCalorieLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCalorieLogInclude<ExtArgs> | null
    /**
     * The filter to search for the UserCalorieLog to update in case it exists.
     */
    where: UserCalorieLogWhereUniqueInput
    /**
     * In case the UserCalorieLog found by the `where` argument doesn't exist, create a new UserCalorieLog with this data.
     */
    create: XOR<UserCalorieLogCreateInput, UserCalorieLogUncheckedCreateInput>
    /**
     * In case the UserCalorieLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserCalorieLogUpdateInput, UserCalorieLogUncheckedUpdateInput>
  }

  /**
   * UserCalorieLog delete
   */
  export type UserCalorieLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCalorieLog
     */
    select?: UserCalorieLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCalorieLog
     */
    omit?: UserCalorieLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCalorieLogInclude<ExtArgs> | null
    /**
     * Filter which UserCalorieLog to delete.
     */
    where: UserCalorieLogWhereUniqueInput
  }

  /**
   * UserCalorieLog deleteMany
   */
  export type UserCalorieLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCalorieLogs to delete
     */
    where?: UserCalorieLogWhereInput
    /**
     * Limit how many UserCalorieLogs to delete.
     */
    limit?: number
  }

  /**
   * UserCalorieLog without action
   */
  export type UserCalorieLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCalorieLog
     */
    select?: UserCalorieLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCalorieLog
     */
    omit?: UserCalorieLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCalorieLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    provider: 'provider',
    providerId: 'providerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserLocationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    latitude: 'latitude',
    longitude: 'longitude'
  };

  export type UserLocationScalarFieldEnum = (typeof UserLocationScalarFieldEnum)[keyof typeof UserLocationScalarFieldEnum]


  export const DietaryRestrictionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DietaryRestrictionScalarFieldEnum = (typeof DietaryRestrictionScalarFieldEnum)[keyof typeof DietaryRestrictionScalarFieldEnum]


  export const UserDietaryScalarFieldEnum: {
    userId: 'userId',
    dietaryId: 'dietaryId'
  };

  export type UserDietaryScalarFieldEnum = (typeof UserDietaryScalarFieldEnum)[keyof typeof UserDietaryScalarFieldEnum]


  export const RestaurantScalarFieldEnum: {
    id: 'id',
    name: 'name',
    address: 'address',
    latitude: 'latitude',
    longitude: 'longitude',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RestaurantScalarFieldEnum = (typeof RestaurantScalarFieldEnum)[keyof typeof RestaurantScalarFieldEnum]


  export const RestaurantReviewScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    restaurantId: 'restaurantId',
    rating: 'rating',
    comment: 'comment',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RestaurantReviewScalarFieldEnum = (typeof RestaurantReviewScalarFieldEnum)[keyof typeof RestaurantReviewScalarFieldEnum]


  export const CuisineScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CuisineScalarFieldEnum = (typeof CuisineScalarFieldEnum)[keyof typeof CuisineScalarFieldEnum]


  export const RestaurantCuisineScalarFieldEnum: {
    restaurantId: 'restaurantId',
    cuisineId: 'cuisineId'
  };

  export type RestaurantCuisineScalarFieldEnum = (typeof RestaurantCuisineScalarFieldEnum)[keyof typeof RestaurantCuisineScalarFieldEnum]


  export const DishScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    calories: 'calories',
    price: 'price',
    restaurantId: 'restaurantId',
    cuisineId: 'cuisineId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DishScalarFieldEnum = (typeof DishScalarFieldEnum)[keyof typeof DishScalarFieldEnum]


  export const DishDietaryScalarFieldEnum: {
    dishId: 'dishId',
    dietaryId: 'dietaryId'
  };

  export type DishDietaryScalarFieldEnum = (typeof DishDietaryScalarFieldEnum)[keyof typeof DishDietaryScalarFieldEnum]


  export const UserMealPlanScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    date: 'date',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserMealPlanScalarFieldEnum = (typeof UserMealPlanScalarFieldEnum)[keyof typeof UserMealPlanScalarFieldEnum]


  export const MealPlanDishScalarFieldEnum: {
    mealPlanId: 'mealPlanId',
    dishId: 'dishId'
  };

  export type MealPlanDishScalarFieldEnum = (typeof MealPlanDishScalarFieldEnum)[keyof typeof MealPlanDishScalarFieldEnum]


  export const UserCalorieLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    date: 'date',
    calories: 'calories',
    createdAt: 'createdAt'
  };

  export type UserCalorieLogScalarFieldEnum = (typeof UserCalorieLogScalarFieldEnum)[keyof typeof UserCalorieLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringNullableFilter<"User"> | string | null
    provider?: StringFilter<"User"> | string
    providerId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    locations?: UserLocationListRelationFilter
    userDietaries?: UserDietaryListRelationFilter
    mealPlans?: UserMealPlanListRelationFilter
    calorieLogs?: UserCalorieLogListRelationFilter
    restaurantReviews?: RestaurantReviewListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrderInput | SortOrder
    provider?: SortOrder
    providerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    locations?: UserLocationOrderByRelationAggregateInput
    userDietaries?: UserDietaryOrderByRelationAggregateInput
    mealPlans?: UserMealPlanOrderByRelationAggregateInput
    calorieLogs?: UserCalorieLogOrderByRelationAggregateInput
    restaurantReviews?: RestaurantReviewOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    provider_providerId?: UserProviderProviderIdCompoundUniqueInput
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringNullableFilter<"User"> | string | null
    provider?: StringFilter<"User"> | string
    providerId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    locations?: UserLocationListRelationFilter
    userDietaries?: UserDietaryListRelationFilter
    mealPlans?: UserMealPlanListRelationFilter
    calorieLogs?: UserCalorieLogListRelationFilter
    restaurantReviews?: RestaurantReviewListRelationFilter
  }, "id" | "email" | "provider_providerId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrderInput | SortOrder
    provider?: SortOrder
    providerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    provider?: StringWithAggregatesFilter<"User"> | string
    providerId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type UserLocationWhereInput = {
    AND?: UserLocationWhereInput | UserLocationWhereInput[]
    OR?: UserLocationWhereInput[]
    NOT?: UserLocationWhereInput | UserLocationWhereInput[]
    id?: IntFilter<"UserLocation"> | number
    userId?: IntFilter<"UserLocation"> | number
    name?: StringFilter<"UserLocation"> | string
    latitude?: FloatFilter<"UserLocation"> | number
    longitude?: FloatFilter<"UserLocation"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserLocationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserLocationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UserLocationWhereInput | UserLocationWhereInput[]
    OR?: UserLocationWhereInput[]
    NOT?: UserLocationWhereInput | UserLocationWhereInput[]
    userId?: IntFilter<"UserLocation"> | number
    name?: StringFilter<"UserLocation"> | string
    latitude?: FloatFilter<"UserLocation"> | number
    longitude?: FloatFilter<"UserLocation"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UserLocationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    _count?: UserLocationCountOrderByAggregateInput
    _avg?: UserLocationAvgOrderByAggregateInput
    _max?: UserLocationMaxOrderByAggregateInput
    _min?: UserLocationMinOrderByAggregateInput
    _sum?: UserLocationSumOrderByAggregateInput
  }

  export type UserLocationScalarWhereWithAggregatesInput = {
    AND?: UserLocationScalarWhereWithAggregatesInput | UserLocationScalarWhereWithAggregatesInput[]
    OR?: UserLocationScalarWhereWithAggregatesInput[]
    NOT?: UserLocationScalarWhereWithAggregatesInput | UserLocationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserLocation"> | number
    userId?: IntWithAggregatesFilter<"UserLocation"> | number
    name?: StringWithAggregatesFilter<"UserLocation"> | string
    latitude?: FloatWithAggregatesFilter<"UserLocation"> | number
    longitude?: FloatWithAggregatesFilter<"UserLocation"> | number
  }

  export type DietaryRestrictionWhereInput = {
    AND?: DietaryRestrictionWhereInput | DietaryRestrictionWhereInput[]
    OR?: DietaryRestrictionWhereInput[]
    NOT?: DietaryRestrictionWhereInput | DietaryRestrictionWhereInput[]
    id?: IntFilter<"DietaryRestriction"> | number
    name?: StringFilter<"DietaryRestriction"> | string
    description?: StringNullableFilter<"DietaryRestriction"> | string | null
    createdAt?: DateTimeFilter<"DietaryRestriction"> | Date | string
    updatedAt?: DateTimeFilter<"DietaryRestriction"> | Date | string
    userDietaries?: UserDietaryListRelationFilter
    dishDietaries?: DishDietaryListRelationFilter
  }

  export type DietaryRestrictionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userDietaries?: UserDietaryOrderByRelationAggregateInput
    dishDietaries?: DishDietaryOrderByRelationAggregateInput
  }

  export type DietaryRestrictionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: DietaryRestrictionWhereInput | DietaryRestrictionWhereInput[]
    OR?: DietaryRestrictionWhereInput[]
    NOT?: DietaryRestrictionWhereInput | DietaryRestrictionWhereInput[]
    description?: StringNullableFilter<"DietaryRestriction"> | string | null
    createdAt?: DateTimeFilter<"DietaryRestriction"> | Date | string
    updatedAt?: DateTimeFilter<"DietaryRestriction"> | Date | string
    userDietaries?: UserDietaryListRelationFilter
    dishDietaries?: DishDietaryListRelationFilter
  }, "id" | "name">

  export type DietaryRestrictionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DietaryRestrictionCountOrderByAggregateInput
    _avg?: DietaryRestrictionAvgOrderByAggregateInput
    _max?: DietaryRestrictionMaxOrderByAggregateInput
    _min?: DietaryRestrictionMinOrderByAggregateInput
    _sum?: DietaryRestrictionSumOrderByAggregateInput
  }

  export type DietaryRestrictionScalarWhereWithAggregatesInput = {
    AND?: DietaryRestrictionScalarWhereWithAggregatesInput | DietaryRestrictionScalarWhereWithAggregatesInput[]
    OR?: DietaryRestrictionScalarWhereWithAggregatesInput[]
    NOT?: DietaryRestrictionScalarWhereWithAggregatesInput | DietaryRestrictionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"DietaryRestriction"> | number
    name?: StringWithAggregatesFilter<"DietaryRestriction"> | string
    description?: StringNullableWithAggregatesFilter<"DietaryRestriction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DietaryRestriction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DietaryRestriction"> | Date | string
  }

  export type UserDietaryWhereInput = {
    AND?: UserDietaryWhereInput | UserDietaryWhereInput[]
    OR?: UserDietaryWhereInput[]
    NOT?: UserDietaryWhereInput | UserDietaryWhereInput[]
    userId?: IntFilter<"UserDietary"> | number
    dietaryId?: IntFilter<"UserDietary"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    dietary?: XOR<DietaryRestrictionScalarRelationFilter, DietaryRestrictionWhereInput>
  }

  export type UserDietaryOrderByWithRelationInput = {
    userId?: SortOrder
    dietaryId?: SortOrder
    user?: UserOrderByWithRelationInput
    dietary?: DietaryRestrictionOrderByWithRelationInput
  }

  export type UserDietaryWhereUniqueInput = Prisma.AtLeast<{
    userId_dietaryId?: UserDietaryUserIdDietaryIdCompoundUniqueInput
    AND?: UserDietaryWhereInput | UserDietaryWhereInput[]
    OR?: UserDietaryWhereInput[]
    NOT?: UserDietaryWhereInput | UserDietaryWhereInput[]
    userId?: IntFilter<"UserDietary"> | number
    dietaryId?: IntFilter<"UserDietary"> | number
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    dietary?: XOR<DietaryRestrictionScalarRelationFilter, DietaryRestrictionWhereInput>
  }, "userId_dietaryId">

  export type UserDietaryOrderByWithAggregationInput = {
    userId?: SortOrder
    dietaryId?: SortOrder
    _count?: UserDietaryCountOrderByAggregateInput
    _avg?: UserDietaryAvgOrderByAggregateInput
    _max?: UserDietaryMaxOrderByAggregateInput
    _min?: UserDietaryMinOrderByAggregateInput
    _sum?: UserDietarySumOrderByAggregateInput
  }

  export type UserDietaryScalarWhereWithAggregatesInput = {
    AND?: UserDietaryScalarWhereWithAggregatesInput | UserDietaryScalarWhereWithAggregatesInput[]
    OR?: UserDietaryScalarWhereWithAggregatesInput[]
    NOT?: UserDietaryScalarWhereWithAggregatesInput | UserDietaryScalarWhereWithAggregatesInput[]
    userId?: IntWithAggregatesFilter<"UserDietary"> | number
    dietaryId?: IntWithAggregatesFilter<"UserDietary"> | number
  }

  export type RestaurantWhereInput = {
    AND?: RestaurantWhereInput | RestaurantWhereInput[]
    OR?: RestaurantWhereInput[]
    NOT?: RestaurantWhereInput | RestaurantWhereInput[]
    id?: IntFilter<"Restaurant"> | number
    name?: StringFilter<"Restaurant"> | string
    address?: StringFilter<"Restaurant"> | string
    latitude?: FloatNullableFilter<"Restaurant"> | number | null
    longitude?: FloatNullableFilter<"Restaurant"> | number | null
    createdAt?: DateTimeFilter<"Restaurant"> | Date | string
    updatedAt?: DateTimeFilter<"Restaurant"> | Date | string
    dishes?: DishListRelationFilter
    restaurantCuisines?: RestaurantCuisineListRelationFilter
    restaurantReviews?: RestaurantReviewListRelationFilter
  }

  export type RestaurantOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dishes?: DishOrderByRelationAggregateInput
    restaurantCuisines?: RestaurantCuisineOrderByRelationAggregateInput
    restaurantReviews?: RestaurantReviewOrderByRelationAggregateInput
  }

  export type RestaurantWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RestaurantWhereInput | RestaurantWhereInput[]
    OR?: RestaurantWhereInput[]
    NOT?: RestaurantWhereInput | RestaurantWhereInput[]
    name?: StringFilter<"Restaurant"> | string
    address?: StringFilter<"Restaurant"> | string
    latitude?: FloatNullableFilter<"Restaurant"> | number | null
    longitude?: FloatNullableFilter<"Restaurant"> | number | null
    createdAt?: DateTimeFilter<"Restaurant"> | Date | string
    updatedAt?: DateTimeFilter<"Restaurant"> | Date | string
    dishes?: DishListRelationFilter
    restaurantCuisines?: RestaurantCuisineListRelationFilter
    restaurantReviews?: RestaurantReviewListRelationFilter
  }, "id">

  export type RestaurantOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RestaurantCountOrderByAggregateInput
    _avg?: RestaurantAvgOrderByAggregateInput
    _max?: RestaurantMaxOrderByAggregateInput
    _min?: RestaurantMinOrderByAggregateInput
    _sum?: RestaurantSumOrderByAggregateInput
  }

  export type RestaurantScalarWhereWithAggregatesInput = {
    AND?: RestaurantScalarWhereWithAggregatesInput | RestaurantScalarWhereWithAggregatesInput[]
    OR?: RestaurantScalarWhereWithAggregatesInput[]
    NOT?: RestaurantScalarWhereWithAggregatesInput | RestaurantScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Restaurant"> | number
    name?: StringWithAggregatesFilter<"Restaurant"> | string
    address?: StringWithAggregatesFilter<"Restaurant"> | string
    latitude?: FloatNullableWithAggregatesFilter<"Restaurant"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"Restaurant"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Restaurant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Restaurant"> | Date | string
  }

  export type RestaurantReviewWhereInput = {
    AND?: RestaurantReviewWhereInput | RestaurantReviewWhereInput[]
    OR?: RestaurantReviewWhereInput[]
    NOT?: RestaurantReviewWhereInput | RestaurantReviewWhereInput[]
    id?: IntFilter<"RestaurantReview"> | number
    userId?: IntFilter<"RestaurantReview"> | number
    restaurantId?: IntFilter<"RestaurantReview"> | number
    rating?: IntFilter<"RestaurantReview"> | number
    comment?: StringNullableFilter<"RestaurantReview"> | string | null
    createdAt?: DateTimeFilter<"RestaurantReview"> | Date | string
    updatedAt?: DateTimeFilter<"RestaurantReview"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    restaurant?: XOR<RestaurantScalarRelationFilter, RestaurantWhereInput>
  }

  export type RestaurantReviewOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    restaurantId?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    restaurant?: RestaurantOrderByWithRelationInput
  }

  export type RestaurantReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RestaurantReviewWhereInput | RestaurantReviewWhereInput[]
    OR?: RestaurantReviewWhereInput[]
    NOT?: RestaurantReviewWhereInput | RestaurantReviewWhereInput[]
    userId?: IntFilter<"RestaurantReview"> | number
    restaurantId?: IntFilter<"RestaurantReview"> | number
    rating?: IntFilter<"RestaurantReview"> | number
    comment?: StringNullableFilter<"RestaurantReview"> | string | null
    createdAt?: DateTimeFilter<"RestaurantReview"> | Date | string
    updatedAt?: DateTimeFilter<"RestaurantReview"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    restaurant?: XOR<RestaurantScalarRelationFilter, RestaurantWhereInput>
  }, "id">

  export type RestaurantReviewOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    restaurantId?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RestaurantReviewCountOrderByAggregateInput
    _avg?: RestaurantReviewAvgOrderByAggregateInput
    _max?: RestaurantReviewMaxOrderByAggregateInput
    _min?: RestaurantReviewMinOrderByAggregateInput
    _sum?: RestaurantReviewSumOrderByAggregateInput
  }

  export type RestaurantReviewScalarWhereWithAggregatesInput = {
    AND?: RestaurantReviewScalarWhereWithAggregatesInput | RestaurantReviewScalarWhereWithAggregatesInput[]
    OR?: RestaurantReviewScalarWhereWithAggregatesInput[]
    NOT?: RestaurantReviewScalarWhereWithAggregatesInput | RestaurantReviewScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RestaurantReview"> | number
    userId?: IntWithAggregatesFilter<"RestaurantReview"> | number
    restaurantId?: IntWithAggregatesFilter<"RestaurantReview"> | number
    rating?: IntWithAggregatesFilter<"RestaurantReview"> | number
    comment?: StringNullableWithAggregatesFilter<"RestaurantReview"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RestaurantReview"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RestaurantReview"> | Date | string
  }

  export type CuisineWhereInput = {
    AND?: CuisineWhereInput | CuisineWhereInput[]
    OR?: CuisineWhereInput[]
    NOT?: CuisineWhereInput | CuisineWhereInput[]
    id?: IntFilter<"Cuisine"> | number
    name?: StringFilter<"Cuisine"> | string
    description?: StringNullableFilter<"Cuisine"> | string | null
    createdAt?: DateTimeFilter<"Cuisine"> | Date | string
    updatedAt?: DateTimeFilter<"Cuisine"> | Date | string
    dishes?: DishListRelationFilter
    restaurantCuisines?: RestaurantCuisineListRelationFilter
  }

  export type CuisineOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    dishes?: DishOrderByRelationAggregateInput
    restaurantCuisines?: RestaurantCuisineOrderByRelationAggregateInput
  }

  export type CuisineWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: CuisineWhereInput | CuisineWhereInput[]
    OR?: CuisineWhereInput[]
    NOT?: CuisineWhereInput | CuisineWhereInput[]
    description?: StringNullableFilter<"Cuisine"> | string | null
    createdAt?: DateTimeFilter<"Cuisine"> | Date | string
    updatedAt?: DateTimeFilter<"Cuisine"> | Date | string
    dishes?: DishListRelationFilter
    restaurantCuisines?: RestaurantCuisineListRelationFilter
  }, "id" | "name">

  export type CuisineOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CuisineCountOrderByAggregateInput
    _avg?: CuisineAvgOrderByAggregateInput
    _max?: CuisineMaxOrderByAggregateInput
    _min?: CuisineMinOrderByAggregateInput
    _sum?: CuisineSumOrderByAggregateInput
  }

  export type CuisineScalarWhereWithAggregatesInput = {
    AND?: CuisineScalarWhereWithAggregatesInput | CuisineScalarWhereWithAggregatesInput[]
    OR?: CuisineScalarWhereWithAggregatesInput[]
    NOT?: CuisineScalarWhereWithAggregatesInput | CuisineScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Cuisine"> | number
    name?: StringWithAggregatesFilter<"Cuisine"> | string
    description?: StringNullableWithAggregatesFilter<"Cuisine"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Cuisine"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Cuisine"> | Date | string
  }

  export type RestaurantCuisineWhereInput = {
    AND?: RestaurantCuisineWhereInput | RestaurantCuisineWhereInput[]
    OR?: RestaurantCuisineWhereInput[]
    NOT?: RestaurantCuisineWhereInput | RestaurantCuisineWhereInput[]
    restaurantId?: IntFilter<"RestaurantCuisine"> | number
    cuisineId?: IntFilter<"RestaurantCuisine"> | number
    restaurant?: XOR<RestaurantScalarRelationFilter, RestaurantWhereInput>
    cuisine?: XOR<CuisineScalarRelationFilter, CuisineWhereInput>
  }

  export type RestaurantCuisineOrderByWithRelationInput = {
    restaurantId?: SortOrder
    cuisineId?: SortOrder
    restaurant?: RestaurantOrderByWithRelationInput
    cuisine?: CuisineOrderByWithRelationInput
  }

  export type RestaurantCuisineWhereUniqueInput = Prisma.AtLeast<{
    restaurantId_cuisineId?: RestaurantCuisineRestaurantIdCuisineIdCompoundUniqueInput
    AND?: RestaurantCuisineWhereInput | RestaurantCuisineWhereInput[]
    OR?: RestaurantCuisineWhereInput[]
    NOT?: RestaurantCuisineWhereInput | RestaurantCuisineWhereInput[]
    restaurantId?: IntFilter<"RestaurantCuisine"> | number
    cuisineId?: IntFilter<"RestaurantCuisine"> | number
    restaurant?: XOR<RestaurantScalarRelationFilter, RestaurantWhereInput>
    cuisine?: XOR<CuisineScalarRelationFilter, CuisineWhereInput>
  }, "restaurantId_cuisineId">

  export type RestaurantCuisineOrderByWithAggregationInput = {
    restaurantId?: SortOrder
    cuisineId?: SortOrder
    _count?: RestaurantCuisineCountOrderByAggregateInput
    _avg?: RestaurantCuisineAvgOrderByAggregateInput
    _max?: RestaurantCuisineMaxOrderByAggregateInput
    _min?: RestaurantCuisineMinOrderByAggregateInput
    _sum?: RestaurantCuisineSumOrderByAggregateInput
  }

  export type RestaurantCuisineScalarWhereWithAggregatesInput = {
    AND?: RestaurantCuisineScalarWhereWithAggregatesInput | RestaurantCuisineScalarWhereWithAggregatesInput[]
    OR?: RestaurantCuisineScalarWhereWithAggregatesInput[]
    NOT?: RestaurantCuisineScalarWhereWithAggregatesInput | RestaurantCuisineScalarWhereWithAggregatesInput[]
    restaurantId?: IntWithAggregatesFilter<"RestaurantCuisine"> | number
    cuisineId?: IntWithAggregatesFilter<"RestaurantCuisine"> | number
  }

  export type DishWhereInput = {
    AND?: DishWhereInput | DishWhereInput[]
    OR?: DishWhereInput[]
    NOT?: DishWhereInput | DishWhereInput[]
    id?: IntFilter<"Dish"> | number
    name?: StringFilter<"Dish"> | string
    description?: StringNullableFilter<"Dish"> | string | null
    calories?: IntNullableFilter<"Dish"> | number | null
    price?: FloatNullableFilter<"Dish"> | number | null
    restaurantId?: IntFilter<"Dish"> | number
    cuisineId?: IntNullableFilter<"Dish"> | number | null
    createdAt?: DateTimeFilter<"Dish"> | Date | string
    updatedAt?: DateTimeFilter<"Dish"> | Date | string
    restaurant?: XOR<RestaurantScalarRelationFilter, RestaurantWhereInput>
    cuisine?: XOR<CuisineNullableScalarRelationFilter, CuisineWhereInput> | null
    dishDietaries?: DishDietaryListRelationFilter
    mealPlanDishes?: MealPlanDishListRelationFilter
  }

  export type DishOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    calories?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    restaurantId?: SortOrder
    cuisineId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    restaurant?: RestaurantOrderByWithRelationInput
    cuisine?: CuisineOrderByWithRelationInput
    dishDietaries?: DishDietaryOrderByRelationAggregateInput
    mealPlanDishes?: MealPlanDishOrderByRelationAggregateInput
  }

  export type DishWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DishWhereInput | DishWhereInput[]
    OR?: DishWhereInput[]
    NOT?: DishWhereInput | DishWhereInput[]
    name?: StringFilter<"Dish"> | string
    description?: StringNullableFilter<"Dish"> | string | null
    calories?: IntNullableFilter<"Dish"> | number | null
    price?: FloatNullableFilter<"Dish"> | number | null
    restaurantId?: IntFilter<"Dish"> | number
    cuisineId?: IntNullableFilter<"Dish"> | number | null
    createdAt?: DateTimeFilter<"Dish"> | Date | string
    updatedAt?: DateTimeFilter<"Dish"> | Date | string
    restaurant?: XOR<RestaurantScalarRelationFilter, RestaurantWhereInput>
    cuisine?: XOR<CuisineNullableScalarRelationFilter, CuisineWhereInput> | null
    dishDietaries?: DishDietaryListRelationFilter
    mealPlanDishes?: MealPlanDishListRelationFilter
  }, "id">

  export type DishOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    calories?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    restaurantId?: SortOrder
    cuisineId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DishCountOrderByAggregateInput
    _avg?: DishAvgOrderByAggregateInput
    _max?: DishMaxOrderByAggregateInput
    _min?: DishMinOrderByAggregateInput
    _sum?: DishSumOrderByAggregateInput
  }

  export type DishScalarWhereWithAggregatesInput = {
    AND?: DishScalarWhereWithAggregatesInput | DishScalarWhereWithAggregatesInput[]
    OR?: DishScalarWhereWithAggregatesInput[]
    NOT?: DishScalarWhereWithAggregatesInput | DishScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Dish"> | number
    name?: StringWithAggregatesFilter<"Dish"> | string
    description?: StringNullableWithAggregatesFilter<"Dish"> | string | null
    calories?: IntNullableWithAggregatesFilter<"Dish"> | number | null
    price?: FloatNullableWithAggregatesFilter<"Dish"> | number | null
    restaurantId?: IntWithAggregatesFilter<"Dish"> | number
    cuisineId?: IntNullableWithAggregatesFilter<"Dish"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Dish"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Dish"> | Date | string
  }

  export type DishDietaryWhereInput = {
    AND?: DishDietaryWhereInput | DishDietaryWhereInput[]
    OR?: DishDietaryWhereInput[]
    NOT?: DishDietaryWhereInput | DishDietaryWhereInput[]
    dishId?: IntFilter<"DishDietary"> | number
    dietaryId?: IntFilter<"DishDietary"> | number
    dish?: XOR<DishScalarRelationFilter, DishWhereInput>
    dietary?: XOR<DietaryRestrictionScalarRelationFilter, DietaryRestrictionWhereInput>
  }

  export type DishDietaryOrderByWithRelationInput = {
    dishId?: SortOrder
    dietaryId?: SortOrder
    dish?: DishOrderByWithRelationInput
    dietary?: DietaryRestrictionOrderByWithRelationInput
  }

  export type DishDietaryWhereUniqueInput = Prisma.AtLeast<{
    dishId_dietaryId?: DishDietaryDishIdDietaryIdCompoundUniqueInput
    AND?: DishDietaryWhereInput | DishDietaryWhereInput[]
    OR?: DishDietaryWhereInput[]
    NOT?: DishDietaryWhereInput | DishDietaryWhereInput[]
    dishId?: IntFilter<"DishDietary"> | number
    dietaryId?: IntFilter<"DishDietary"> | number
    dish?: XOR<DishScalarRelationFilter, DishWhereInput>
    dietary?: XOR<DietaryRestrictionScalarRelationFilter, DietaryRestrictionWhereInput>
  }, "dishId_dietaryId">

  export type DishDietaryOrderByWithAggregationInput = {
    dishId?: SortOrder
    dietaryId?: SortOrder
    _count?: DishDietaryCountOrderByAggregateInput
    _avg?: DishDietaryAvgOrderByAggregateInput
    _max?: DishDietaryMaxOrderByAggregateInput
    _min?: DishDietaryMinOrderByAggregateInput
    _sum?: DishDietarySumOrderByAggregateInput
  }

  export type DishDietaryScalarWhereWithAggregatesInput = {
    AND?: DishDietaryScalarWhereWithAggregatesInput | DishDietaryScalarWhereWithAggregatesInput[]
    OR?: DishDietaryScalarWhereWithAggregatesInput[]
    NOT?: DishDietaryScalarWhereWithAggregatesInput | DishDietaryScalarWhereWithAggregatesInput[]
    dishId?: IntWithAggregatesFilter<"DishDietary"> | number
    dietaryId?: IntWithAggregatesFilter<"DishDietary"> | number
  }

  export type UserMealPlanWhereInput = {
    AND?: UserMealPlanWhereInput | UserMealPlanWhereInput[]
    OR?: UserMealPlanWhereInput[]
    NOT?: UserMealPlanWhereInput | UserMealPlanWhereInput[]
    id?: IntFilter<"UserMealPlan"> | number
    userId?: IntFilter<"UserMealPlan"> | number
    date?: DateTimeFilter<"UserMealPlan"> | Date | string
    createdAt?: DateTimeFilter<"UserMealPlan"> | Date | string
    updatedAt?: DateTimeFilter<"UserMealPlan"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    mealPlanDishes?: MealPlanDishListRelationFilter
  }

  export type UserMealPlanOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    mealPlanDishes?: MealPlanDishOrderByRelationAggregateInput
  }

  export type UserMealPlanWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UserMealPlanWhereInput | UserMealPlanWhereInput[]
    OR?: UserMealPlanWhereInput[]
    NOT?: UserMealPlanWhereInput | UserMealPlanWhereInput[]
    userId?: IntFilter<"UserMealPlan"> | number
    date?: DateTimeFilter<"UserMealPlan"> | Date | string
    createdAt?: DateTimeFilter<"UserMealPlan"> | Date | string
    updatedAt?: DateTimeFilter<"UserMealPlan"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    mealPlanDishes?: MealPlanDishListRelationFilter
  }, "id">

  export type UserMealPlanOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserMealPlanCountOrderByAggregateInput
    _avg?: UserMealPlanAvgOrderByAggregateInput
    _max?: UserMealPlanMaxOrderByAggregateInput
    _min?: UserMealPlanMinOrderByAggregateInput
    _sum?: UserMealPlanSumOrderByAggregateInput
  }

  export type UserMealPlanScalarWhereWithAggregatesInput = {
    AND?: UserMealPlanScalarWhereWithAggregatesInput | UserMealPlanScalarWhereWithAggregatesInput[]
    OR?: UserMealPlanScalarWhereWithAggregatesInput[]
    NOT?: UserMealPlanScalarWhereWithAggregatesInput | UserMealPlanScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserMealPlan"> | number
    userId?: IntWithAggregatesFilter<"UserMealPlan"> | number
    date?: DateTimeWithAggregatesFilter<"UserMealPlan"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"UserMealPlan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserMealPlan"> | Date | string
  }

  export type MealPlanDishWhereInput = {
    AND?: MealPlanDishWhereInput | MealPlanDishWhereInput[]
    OR?: MealPlanDishWhereInput[]
    NOT?: MealPlanDishWhereInput | MealPlanDishWhereInput[]
    mealPlanId?: IntFilter<"MealPlanDish"> | number
    dishId?: IntFilter<"MealPlanDish"> | number
    mealPlan?: XOR<UserMealPlanScalarRelationFilter, UserMealPlanWhereInput>
    dish?: XOR<DishScalarRelationFilter, DishWhereInput>
  }

  export type MealPlanDishOrderByWithRelationInput = {
    mealPlanId?: SortOrder
    dishId?: SortOrder
    mealPlan?: UserMealPlanOrderByWithRelationInput
    dish?: DishOrderByWithRelationInput
  }

  export type MealPlanDishWhereUniqueInput = Prisma.AtLeast<{
    mealPlanId_dishId?: MealPlanDishMealPlanIdDishIdCompoundUniqueInput
    AND?: MealPlanDishWhereInput | MealPlanDishWhereInput[]
    OR?: MealPlanDishWhereInput[]
    NOT?: MealPlanDishWhereInput | MealPlanDishWhereInput[]
    mealPlanId?: IntFilter<"MealPlanDish"> | number
    dishId?: IntFilter<"MealPlanDish"> | number
    mealPlan?: XOR<UserMealPlanScalarRelationFilter, UserMealPlanWhereInput>
    dish?: XOR<DishScalarRelationFilter, DishWhereInput>
  }, "mealPlanId_dishId">

  export type MealPlanDishOrderByWithAggregationInput = {
    mealPlanId?: SortOrder
    dishId?: SortOrder
    _count?: MealPlanDishCountOrderByAggregateInput
    _avg?: MealPlanDishAvgOrderByAggregateInput
    _max?: MealPlanDishMaxOrderByAggregateInput
    _min?: MealPlanDishMinOrderByAggregateInput
    _sum?: MealPlanDishSumOrderByAggregateInput
  }

  export type MealPlanDishScalarWhereWithAggregatesInput = {
    AND?: MealPlanDishScalarWhereWithAggregatesInput | MealPlanDishScalarWhereWithAggregatesInput[]
    OR?: MealPlanDishScalarWhereWithAggregatesInput[]
    NOT?: MealPlanDishScalarWhereWithAggregatesInput | MealPlanDishScalarWhereWithAggregatesInput[]
    mealPlanId?: IntWithAggregatesFilter<"MealPlanDish"> | number
    dishId?: IntWithAggregatesFilter<"MealPlanDish"> | number
  }

  export type UserCalorieLogWhereInput = {
    AND?: UserCalorieLogWhereInput | UserCalorieLogWhereInput[]
    OR?: UserCalorieLogWhereInput[]
    NOT?: UserCalorieLogWhereInput | UserCalorieLogWhereInput[]
    id?: IntFilter<"UserCalorieLog"> | number
    userId?: IntFilter<"UserCalorieLog"> | number
    date?: DateTimeFilter<"UserCalorieLog"> | Date | string
    calories?: IntFilter<"UserCalorieLog"> | number
    createdAt?: DateTimeFilter<"UserCalorieLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserCalorieLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    calories?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserCalorieLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UserCalorieLogWhereInput | UserCalorieLogWhereInput[]
    OR?: UserCalorieLogWhereInput[]
    NOT?: UserCalorieLogWhereInput | UserCalorieLogWhereInput[]
    userId?: IntFilter<"UserCalorieLog"> | number
    date?: DateTimeFilter<"UserCalorieLog"> | Date | string
    calories?: IntFilter<"UserCalorieLog"> | number
    createdAt?: DateTimeFilter<"UserCalorieLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UserCalorieLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    calories?: SortOrder
    createdAt?: SortOrder
    _count?: UserCalorieLogCountOrderByAggregateInput
    _avg?: UserCalorieLogAvgOrderByAggregateInput
    _max?: UserCalorieLogMaxOrderByAggregateInput
    _min?: UserCalorieLogMinOrderByAggregateInput
    _sum?: UserCalorieLogSumOrderByAggregateInput
  }

  export type UserCalorieLogScalarWhereWithAggregatesInput = {
    AND?: UserCalorieLogScalarWhereWithAggregatesInput | UserCalorieLogScalarWhereWithAggregatesInput[]
    OR?: UserCalorieLogScalarWhereWithAggregatesInput[]
    NOT?: UserCalorieLogScalarWhereWithAggregatesInput | UserCalorieLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserCalorieLog"> | number
    userId?: IntWithAggregatesFilter<"UserCalorieLog"> | number
    date?: DateTimeWithAggregatesFilter<"UserCalorieLog"> | Date | string
    calories?: IntWithAggregatesFilter<"UserCalorieLog"> | number
    createdAt?: DateTimeWithAggregatesFilter<"UserCalorieLog"> | Date | string
  }

  export type UserCreateInput = {
    name: string
    email: string
    passwordHash?: string | null
    provider: string
    providerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: UserLocationCreateNestedManyWithoutUserInput
    userDietaries?: UserDietaryCreateNestedManyWithoutUserInput
    mealPlans?: UserMealPlanCreateNestedManyWithoutUserInput
    calorieLogs?: UserCalorieLogCreateNestedManyWithoutUserInput
    restaurantReviews?: RestaurantReviewCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    passwordHash?: string | null
    provider: string
    providerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: UserLocationUncheckedCreateNestedManyWithoutUserInput
    userDietaries?: UserDietaryUncheckedCreateNestedManyWithoutUserInput
    mealPlans?: UserMealPlanUncheckedCreateNestedManyWithoutUserInput
    calorieLogs?: UserCalorieLogUncheckedCreateNestedManyWithoutUserInput
    restaurantReviews?: RestaurantReviewUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: UserLocationUpdateManyWithoutUserNestedInput
    userDietaries?: UserDietaryUpdateManyWithoutUserNestedInput
    mealPlans?: UserMealPlanUpdateManyWithoutUserNestedInput
    calorieLogs?: UserCalorieLogUpdateManyWithoutUserNestedInput
    restaurantReviews?: RestaurantReviewUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: UserLocationUncheckedUpdateManyWithoutUserNestedInput
    userDietaries?: UserDietaryUncheckedUpdateManyWithoutUserNestedInput
    mealPlans?: UserMealPlanUncheckedUpdateManyWithoutUserNestedInput
    calorieLogs?: UserCalorieLogUncheckedUpdateManyWithoutUserNestedInput
    restaurantReviews?: RestaurantReviewUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name: string
    email: string
    passwordHash?: string | null
    provider: string
    providerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserLocationCreateInput = {
    name: string
    latitude: number
    longitude: number
    user: UserCreateNestedOneWithoutLocationsInput
  }

  export type UserLocationUncheckedCreateInput = {
    id?: number
    userId: number
    name: string
    latitude: number
    longitude: number
  }

  export type UserLocationUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    user?: UserUpdateOneRequiredWithoutLocationsNestedInput
  }

  export type UserLocationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
  }

  export type UserLocationCreateManyInput = {
    id?: number
    userId: number
    name: string
    latitude: number
    longitude: number
  }

  export type UserLocationUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
  }

  export type UserLocationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
  }

  export type DietaryRestrictionCreateInput = {
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userDietaries?: UserDietaryCreateNestedManyWithoutDietaryInput
    dishDietaries?: DishDietaryCreateNestedManyWithoutDietaryInput
  }

  export type DietaryRestrictionUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userDietaries?: UserDietaryUncheckedCreateNestedManyWithoutDietaryInput
    dishDietaries?: DishDietaryUncheckedCreateNestedManyWithoutDietaryInput
  }

  export type DietaryRestrictionUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userDietaries?: UserDietaryUpdateManyWithoutDietaryNestedInput
    dishDietaries?: DishDietaryUpdateManyWithoutDietaryNestedInput
  }

  export type DietaryRestrictionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userDietaries?: UserDietaryUncheckedUpdateManyWithoutDietaryNestedInput
    dishDietaries?: DishDietaryUncheckedUpdateManyWithoutDietaryNestedInput
  }

  export type DietaryRestrictionCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DietaryRestrictionUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DietaryRestrictionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDietaryCreateInput = {
    user: UserCreateNestedOneWithoutUserDietariesInput
    dietary: DietaryRestrictionCreateNestedOneWithoutUserDietariesInput
  }

  export type UserDietaryUncheckedCreateInput = {
    userId: number
    dietaryId: number
  }

  export type UserDietaryUpdateInput = {
    user?: UserUpdateOneRequiredWithoutUserDietariesNestedInput
    dietary?: DietaryRestrictionUpdateOneRequiredWithoutUserDietariesNestedInput
  }

  export type UserDietaryUncheckedUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    dietaryId?: IntFieldUpdateOperationsInput | number
  }

  export type UserDietaryCreateManyInput = {
    userId: number
    dietaryId: number
  }

  export type UserDietaryUpdateManyMutationInput = {

  }

  export type UserDietaryUncheckedUpdateManyInput = {
    userId?: IntFieldUpdateOperationsInput | number
    dietaryId?: IntFieldUpdateOperationsInput | number
  }

  export type RestaurantCreateInput = {
    name: string
    address: string
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dishes?: DishCreateNestedManyWithoutRestaurantInput
    restaurantCuisines?: RestaurantCuisineCreateNestedManyWithoutRestaurantInput
    restaurantReviews?: RestaurantReviewCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantUncheckedCreateInput = {
    id?: number
    name: string
    address: string
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dishes?: DishUncheckedCreateNestedManyWithoutRestaurantInput
    restaurantCuisines?: RestaurantCuisineUncheckedCreateNestedManyWithoutRestaurantInput
    restaurantReviews?: RestaurantReviewUncheckedCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dishes?: DishUpdateManyWithoutRestaurantNestedInput
    restaurantCuisines?: RestaurantCuisineUpdateManyWithoutRestaurantNestedInput
    restaurantReviews?: RestaurantReviewUpdateManyWithoutRestaurantNestedInput
  }

  export type RestaurantUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dishes?: DishUncheckedUpdateManyWithoutRestaurantNestedInput
    restaurantCuisines?: RestaurantCuisineUncheckedUpdateManyWithoutRestaurantNestedInput
    restaurantReviews?: RestaurantReviewUncheckedUpdateManyWithoutRestaurantNestedInput
  }

  export type RestaurantCreateManyInput = {
    id?: number
    name: string
    address: string
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RestaurantUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestaurantUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestaurantReviewCreateInput = {
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRestaurantReviewsInput
    restaurant: RestaurantCreateNestedOneWithoutRestaurantReviewsInput
  }

  export type RestaurantReviewUncheckedCreateInput = {
    id?: number
    userId: number
    restaurantId: number
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RestaurantReviewUpdateInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRestaurantReviewsNestedInput
    restaurant?: RestaurantUpdateOneRequiredWithoutRestaurantReviewsNestedInput
  }

  export type RestaurantReviewUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    restaurantId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestaurantReviewCreateManyInput = {
    id?: number
    userId: number
    restaurantId: number
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RestaurantReviewUpdateManyMutationInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestaurantReviewUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    restaurantId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CuisineCreateInput = {
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dishes?: DishCreateNestedManyWithoutCuisineInput
    restaurantCuisines?: RestaurantCuisineCreateNestedManyWithoutCuisineInput
  }

  export type CuisineUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dishes?: DishUncheckedCreateNestedManyWithoutCuisineInput
    restaurantCuisines?: RestaurantCuisineUncheckedCreateNestedManyWithoutCuisineInput
  }

  export type CuisineUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dishes?: DishUpdateManyWithoutCuisineNestedInput
    restaurantCuisines?: RestaurantCuisineUpdateManyWithoutCuisineNestedInput
  }

  export type CuisineUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dishes?: DishUncheckedUpdateManyWithoutCuisineNestedInput
    restaurantCuisines?: RestaurantCuisineUncheckedUpdateManyWithoutCuisineNestedInput
  }

  export type CuisineCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CuisineUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CuisineUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestaurantCuisineCreateInput = {
    restaurant: RestaurantCreateNestedOneWithoutRestaurantCuisinesInput
    cuisine: CuisineCreateNestedOneWithoutRestaurantCuisinesInput
  }

  export type RestaurantCuisineUncheckedCreateInput = {
    restaurantId: number
    cuisineId: number
  }

  export type RestaurantCuisineUpdateInput = {
    restaurant?: RestaurantUpdateOneRequiredWithoutRestaurantCuisinesNestedInput
    cuisine?: CuisineUpdateOneRequiredWithoutRestaurantCuisinesNestedInput
  }

  export type RestaurantCuisineUncheckedUpdateInput = {
    restaurantId?: IntFieldUpdateOperationsInput | number
    cuisineId?: IntFieldUpdateOperationsInput | number
  }

  export type RestaurantCuisineCreateManyInput = {
    restaurantId: number
    cuisineId: number
  }

  export type RestaurantCuisineUpdateManyMutationInput = {

  }

  export type RestaurantCuisineUncheckedUpdateManyInput = {
    restaurantId?: IntFieldUpdateOperationsInput | number
    cuisineId?: IntFieldUpdateOperationsInput | number
  }

  export type DishCreateInput = {
    name: string
    description?: string | null
    calories?: number | null
    price?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    restaurant: RestaurantCreateNestedOneWithoutDishesInput
    cuisine?: CuisineCreateNestedOneWithoutDishesInput
    dishDietaries?: DishDietaryCreateNestedManyWithoutDishInput
    mealPlanDishes?: MealPlanDishCreateNestedManyWithoutDishInput
  }

  export type DishUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    calories?: number | null
    price?: number | null
    restaurantId: number
    cuisineId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dishDietaries?: DishDietaryUncheckedCreateNestedManyWithoutDishInput
    mealPlanDishes?: MealPlanDishUncheckedCreateNestedManyWithoutDishInput
  }

  export type DishUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restaurant?: RestaurantUpdateOneRequiredWithoutDishesNestedInput
    cuisine?: CuisineUpdateOneWithoutDishesNestedInput
    dishDietaries?: DishDietaryUpdateManyWithoutDishNestedInput
    mealPlanDishes?: MealPlanDishUpdateManyWithoutDishNestedInput
  }

  export type DishUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    restaurantId?: IntFieldUpdateOperationsInput | number
    cuisineId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dishDietaries?: DishDietaryUncheckedUpdateManyWithoutDishNestedInput
    mealPlanDishes?: MealPlanDishUncheckedUpdateManyWithoutDishNestedInput
  }

  export type DishCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    calories?: number | null
    price?: number | null
    restaurantId: number
    cuisineId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DishUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DishUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    restaurantId?: IntFieldUpdateOperationsInput | number
    cuisineId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DishDietaryCreateInput = {
    dish: DishCreateNestedOneWithoutDishDietariesInput
    dietary: DietaryRestrictionCreateNestedOneWithoutDishDietariesInput
  }

  export type DishDietaryUncheckedCreateInput = {
    dishId: number
    dietaryId: number
  }

  export type DishDietaryUpdateInput = {
    dish?: DishUpdateOneRequiredWithoutDishDietariesNestedInput
    dietary?: DietaryRestrictionUpdateOneRequiredWithoutDishDietariesNestedInput
  }

  export type DishDietaryUncheckedUpdateInput = {
    dishId?: IntFieldUpdateOperationsInput | number
    dietaryId?: IntFieldUpdateOperationsInput | number
  }

  export type DishDietaryCreateManyInput = {
    dishId: number
    dietaryId: number
  }

  export type DishDietaryUpdateManyMutationInput = {

  }

  export type DishDietaryUncheckedUpdateManyInput = {
    dishId?: IntFieldUpdateOperationsInput | number
    dietaryId?: IntFieldUpdateOperationsInput | number
  }

  export type UserMealPlanCreateInput = {
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMealPlansInput
    mealPlanDishes?: MealPlanDishCreateNestedManyWithoutMealPlanInput
  }

  export type UserMealPlanUncheckedCreateInput = {
    id?: number
    userId: number
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    mealPlanDishes?: MealPlanDishUncheckedCreateNestedManyWithoutMealPlanInput
  }

  export type UserMealPlanUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMealPlansNestedInput
    mealPlanDishes?: MealPlanDishUpdateManyWithoutMealPlanNestedInput
  }

  export type UserMealPlanUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mealPlanDishes?: MealPlanDishUncheckedUpdateManyWithoutMealPlanNestedInput
  }

  export type UserMealPlanCreateManyInput = {
    id?: number
    userId: number
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserMealPlanUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserMealPlanUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MealPlanDishCreateInput = {
    mealPlan: UserMealPlanCreateNestedOneWithoutMealPlanDishesInput
    dish: DishCreateNestedOneWithoutMealPlanDishesInput
  }

  export type MealPlanDishUncheckedCreateInput = {
    mealPlanId: number
    dishId: number
  }

  export type MealPlanDishUpdateInput = {
    mealPlan?: UserMealPlanUpdateOneRequiredWithoutMealPlanDishesNestedInput
    dish?: DishUpdateOneRequiredWithoutMealPlanDishesNestedInput
  }

  export type MealPlanDishUncheckedUpdateInput = {
    mealPlanId?: IntFieldUpdateOperationsInput | number
    dishId?: IntFieldUpdateOperationsInput | number
  }

  export type MealPlanDishCreateManyInput = {
    mealPlanId: number
    dishId: number
  }

  export type MealPlanDishUpdateManyMutationInput = {

  }

  export type MealPlanDishUncheckedUpdateManyInput = {
    mealPlanId?: IntFieldUpdateOperationsInput | number
    dishId?: IntFieldUpdateOperationsInput | number
  }

  export type UserCalorieLogCreateInput = {
    date: Date | string
    calories: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCalorieLogsInput
  }

  export type UserCalorieLogUncheckedCreateInput = {
    id?: number
    userId: number
    date: Date | string
    calories: number
    createdAt?: Date | string
  }

  export type UserCalorieLogUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    calories?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCalorieLogsNestedInput
  }

  export type UserCalorieLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    calories?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCalorieLogCreateManyInput = {
    id?: number
    userId: number
    date: Date | string
    calories: number
    createdAt?: Date | string
  }

  export type UserCalorieLogUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    calories?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCalorieLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    calories?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserLocationListRelationFilter = {
    every?: UserLocationWhereInput
    some?: UserLocationWhereInput
    none?: UserLocationWhereInput
  }

  export type UserDietaryListRelationFilter = {
    every?: UserDietaryWhereInput
    some?: UserDietaryWhereInput
    none?: UserDietaryWhereInput
  }

  export type UserMealPlanListRelationFilter = {
    every?: UserMealPlanWhereInput
    some?: UserMealPlanWhereInput
    none?: UserMealPlanWhereInput
  }

  export type UserCalorieLogListRelationFilter = {
    every?: UserCalorieLogWhereInput
    some?: UserCalorieLogWhereInput
    none?: UserCalorieLogWhereInput
  }

  export type RestaurantReviewListRelationFilter = {
    every?: RestaurantReviewWhereInput
    some?: RestaurantReviewWhereInput
    none?: RestaurantReviewWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserLocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserDietaryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserMealPlanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCalorieLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RestaurantReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserProviderProviderIdCompoundUniqueInput = {
    provider: string
    providerId: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    provider?: SortOrder
    providerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserLocationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type UserLocationAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type UserLocationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type UserLocationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type UserLocationSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DishDietaryListRelationFilter = {
    every?: DishDietaryWhereInput
    some?: DishDietaryWhereInput
    none?: DishDietaryWhereInput
  }

  export type DishDietaryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DietaryRestrictionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DietaryRestrictionAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DietaryRestrictionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DietaryRestrictionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DietaryRestrictionSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DietaryRestrictionScalarRelationFilter = {
    is?: DietaryRestrictionWhereInput
    isNot?: DietaryRestrictionWhereInput
  }

  export type UserDietaryUserIdDietaryIdCompoundUniqueInput = {
    userId: number
    dietaryId: number
  }

  export type UserDietaryCountOrderByAggregateInput = {
    userId?: SortOrder
    dietaryId?: SortOrder
  }

  export type UserDietaryAvgOrderByAggregateInput = {
    userId?: SortOrder
    dietaryId?: SortOrder
  }

  export type UserDietaryMaxOrderByAggregateInput = {
    userId?: SortOrder
    dietaryId?: SortOrder
  }

  export type UserDietaryMinOrderByAggregateInput = {
    userId?: SortOrder
    dietaryId?: SortOrder
  }

  export type UserDietarySumOrderByAggregateInput = {
    userId?: SortOrder
    dietaryId?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DishListRelationFilter = {
    every?: DishWhereInput
    some?: DishWhereInput
    none?: DishWhereInput
  }

  export type RestaurantCuisineListRelationFilter = {
    every?: RestaurantCuisineWhereInput
    some?: RestaurantCuisineWhereInput
    none?: RestaurantCuisineWhereInput
  }

  export type DishOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RestaurantCuisineOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RestaurantCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RestaurantAvgOrderByAggregateInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type RestaurantMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RestaurantMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    address?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RestaurantSumOrderByAggregateInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type RestaurantScalarRelationFilter = {
    is?: RestaurantWhereInput
    isNot?: RestaurantWhereInput
  }

  export type RestaurantReviewCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    restaurantId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RestaurantReviewAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    restaurantId?: SortOrder
    rating?: SortOrder
  }

  export type RestaurantReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    restaurantId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RestaurantReviewMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    restaurantId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RestaurantReviewSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    restaurantId?: SortOrder
    rating?: SortOrder
  }

  export type CuisineCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CuisineAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CuisineMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CuisineMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CuisineSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CuisineScalarRelationFilter = {
    is?: CuisineWhereInput
    isNot?: CuisineWhereInput
  }

  export type RestaurantCuisineRestaurantIdCuisineIdCompoundUniqueInput = {
    restaurantId: number
    cuisineId: number
  }

  export type RestaurantCuisineCountOrderByAggregateInput = {
    restaurantId?: SortOrder
    cuisineId?: SortOrder
  }

  export type RestaurantCuisineAvgOrderByAggregateInput = {
    restaurantId?: SortOrder
    cuisineId?: SortOrder
  }

  export type RestaurantCuisineMaxOrderByAggregateInput = {
    restaurantId?: SortOrder
    cuisineId?: SortOrder
  }

  export type RestaurantCuisineMinOrderByAggregateInput = {
    restaurantId?: SortOrder
    cuisineId?: SortOrder
  }

  export type RestaurantCuisineSumOrderByAggregateInput = {
    restaurantId?: SortOrder
    cuisineId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type CuisineNullableScalarRelationFilter = {
    is?: CuisineWhereInput | null
    isNot?: CuisineWhereInput | null
  }

  export type MealPlanDishListRelationFilter = {
    every?: MealPlanDishWhereInput
    some?: MealPlanDishWhereInput
    none?: MealPlanDishWhereInput
  }

  export type MealPlanDishOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DishCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    calories?: SortOrder
    price?: SortOrder
    restaurantId?: SortOrder
    cuisineId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DishAvgOrderByAggregateInput = {
    id?: SortOrder
    calories?: SortOrder
    price?: SortOrder
    restaurantId?: SortOrder
    cuisineId?: SortOrder
  }

  export type DishMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    calories?: SortOrder
    price?: SortOrder
    restaurantId?: SortOrder
    cuisineId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DishMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    calories?: SortOrder
    price?: SortOrder
    restaurantId?: SortOrder
    cuisineId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DishSumOrderByAggregateInput = {
    id?: SortOrder
    calories?: SortOrder
    price?: SortOrder
    restaurantId?: SortOrder
    cuisineId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DishScalarRelationFilter = {
    is?: DishWhereInput
    isNot?: DishWhereInput
  }

  export type DishDietaryDishIdDietaryIdCompoundUniqueInput = {
    dishId: number
    dietaryId: number
  }

  export type DishDietaryCountOrderByAggregateInput = {
    dishId?: SortOrder
    dietaryId?: SortOrder
  }

  export type DishDietaryAvgOrderByAggregateInput = {
    dishId?: SortOrder
    dietaryId?: SortOrder
  }

  export type DishDietaryMaxOrderByAggregateInput = {
    dishId?: SortOrder
    dietaryId?: SortOrder
  }

  export type DishDietaryMinOrderByAggregateInput = {
    dishId?: SortOrder
    dietaryId?: SortOrder
  }

  export type DishDietarySumOrderByAggregateInput = {
    dishId?: SortOrder
    dietaryId?: SortOrder
  }

  export type UserMealPlanCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMealPlanAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type UserMealPlanMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMealPlanMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMealPlanSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type UserMealPlanScalarRelationFilter = {
    is?: UserMealPlanWhereInput
    isNot?: UserMealPlanWhereInput
  }

  export type MealPlanDishMealPlanIdDishIdCompoundUniqueInput = {
    mealPlanId: number
    dishId: number
  }

  export type MealPlanDishCountOrderByAggregateInput = {
    mealPlanId?: SortOrder
    dishId?: SortOrder
  }

  export type MealPlanDishAvgOrderByAggregateInput = {
    mealPlanId?: SortOrder
    dishId?: SortOrder
  }

  export type MealPlanDishMaxOrderByAggregateInput = {
    mealPlanId?: SortOrder
    dishId?: SortOrder
  }

  export type MealPlanDishMinOrderByAggregateInput = {
    mealPlanId?: SortOrder
    dishId?: SortOrder
  }

  export type MealPlanDishSumOrderByAggregateInput = {
    mealPlanId?: SortOrder
    dishId?: SortOrder
  }

  export type UserCalorieLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    calories?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCalorieLogAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    calories?: SortOrder
  }

  export type UserCalorieLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    calories?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCalorieLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    calories?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCalorieLogSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    calories?: SortOrder
  }

  export type UserLocationCreateNestedManyWithoutUserInput = {
    create?: XOR<UserLocationCreateWithoutUserInput, UserLocationUncheckedCreateWithoutUserInput> | UserLocationCreateWithoutUserInput[] | UserLocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLocationCreateOrConnectWithoutUserInput | UserLocationCreateOrConnectWithoutUserInput[]
    createMany?: UserLocationCreateManyUserInputEnvelope
    connect?: UserLocationWhereUniqueInput | UserLocationWhereUniqueInput[]
  }

  export type UserDietaryCreateNestedManyWithoutUserInput = {
    create?: XOR<UserDietaryCreateWithoutUserInput, UserDietaryUncheckedCreateWithoutUserInput> | UserDietaryCreateWithoutUserInput[] | UserDietaryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDietaryCreateOrConnectWithoutUserInput | UserDietaryCreateOrConnectWithoutUserInput[]
    createMany?: UserDietaryCreateManyUserInputEnvelope
    connect?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
  }

  export type UserMealPlanCreateNestedManyWithoutUserInput = {
    create?: XOR<UserMealPlanCreateWithoutUserInput, UserMealPlanUncheckedCreateWithoutUserInput> | UserMealPlanCreateWithoutUserInput[] | UserMealPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserMealPlanCreateOrConnectWithoutUserInput | UserMealPlanCreateOrConnectWithoutUserInput[]
    createMany?: UserMealPlanCreateManyUserInputEnvelope
    connect?: UserMealPlanWhereUniqueInput | UserMealPlanWhereUniqueInput[]
  }

  export type UserCalorieLogCreateNestedManyWithoutUserInput = {
    create?: XOR<UserCalorieLogCreateWithoutUserInput, UserCalorieLogUncheckedCreateWithoutUserInput> | UserCalorieLogCreateWithoutUserInput[] | UserCalorieLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCalorieLogCreateOrConnectWithoutUserInput | UserCalorieLogCreateOrConnectWithoutUserInput[]
    createMany?: UserCalorieLogCreateManyUserInputEnvelope
    connect?: UserCalorieLogWhereUniqueInput | UserCalorieLogWhereUniqueInput[]
  }

  export type RestaurantReviewCreateNestedManyWithoutUserInput = {
    create?: XOR<RestaurantReviewCreateWithoutUserInput, RestaurantReviewUncheckedCreateWithoutUserInput> | RestaurantReviewCreateWithoutUserInput[] | RestaurantReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RestaurantReviewCreateOrConnectWithoutUserInput | RestaurantReviewCreateOrConnectWithoutUserInput[]
    createMany?: RestaurantReviewCreateManyUserInputEnvelope
    connect?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
  }

  export type UserLocationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserLocationCreateWithoutUserInput, UserLocationUncheckedCreateWithoutUserInput> | UserLocationCreateWithoutUserInput[] | UserLocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLocationCreateOrConnectWithoutUserInput | UserLocationCreateOrConnectWithoutUserInput[]
    createMany?: UserLocationCreateManyUserInputEnvelope
    connect?: UserLocationWhereUniqueInput | UserLocationWhereUniqueInput[]
  }

  export type UserDietaryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserDietaryCreateWithoutUserInput, UserDietaryUncheckedCreateWithoutUserInput> | UserDietaryCreateWithoutUserInput[] | UserDietaryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDietaryCreateOrConnectWithoutUserInput | UserDietaryCreateOrConnectWithoutUserInput[]
    createMany?: UserDietaryCreateManyUserInputEnvelope
    connect?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
  }

  export type UserMealPlanUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserMealPlanCreateWithoutUserInput, UserMealPlanUncheckedCreateWithoutUserInput> | UserMealPlanCreateWithoutUserInput[] | UserMealPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserMealPlanCreateOrConnectWithoutUserInput | UserMealPlanCreateOrConnectWithoutUserInput[]
    createMany?: UserMealPlanCreateManyUserInputEnvelope
    connect?: UserMealPlanWhereUniqueInput | UserMealPlanWhereUniqueInput[]
  }

  export type UserCalorieLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserCalorieLogCreateWithoutUserInput, UserCalorieLogUncheckedCreateWithoutUserInput> | UserCalorieLogCreateWithoutUserInput[] | UserCalorieLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCalorieLogCreateOrConnectWithoutUserInput | UserCalorieLogCreateOrConnectWithoutUserInput[]
    createMany?: UserCalorieLogCreateManyUserInputEnvelope
    connect?: UserCalorieLogWhereUniqueInput | UserCalorieLogWhereUniqueInput[]
  }

  export type RestaurantReviewUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RestaurantReviewCreateWithoutUserInput, RestaurantReviewUncheckedCreateWithoutUserInput> | RestaurantReviewCreateWithoutUserInput[] | RestaurantReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RestaurantReviewCreateOrConnectWithoutUserInput | RestaurantReviewCreateOrConnectWithoutUserInput[]
    createMany?: RestaurantReviewCreateManyUserInputEnvelope
    connect?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserLocationUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserLocationCreateWithoutUserInput, UserLocationUncheckedCreateWithoutUserInput> | UserLocationCreateWithoutUserInput[] | UserLocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLocationCreateOrConnectWithoutUserInput | UserLocationCreateOrConnectWithoutUserInput[]
    upsert?: UserLocationUpsertWithWhereUniqueWithoutUserInput | UserLocationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserLocationCreateManyUserInputEnvelope
    set?: UserLocationWhereUniqueInput | UserLocationWhereUniqueInput[]
    disconnect?: UserLocationWhereUniqueInput | UserLocationWhereUniqueInput[]
    delete?: UserLocationWhereUniqueInput | UserLocationWhereUniqueInput[]
    connect?: UserLocationWhereUniqueInput | UserLocationWhereUniqueInput[]
    update?: UserLocationUpdateWithWhereUniqueWithoutUserInput | UserLocationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserLocationUpdateManyWithWhereWithoutUserInput | UserLocationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserLocationScalarWhereInput | UserLocationScalarWhereInput[]
  }

  export type UserDietaryUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserDietaryCreateWithoutUserInput, UserDietaryUncheckedCreateWithoutUserInput> | UserDietaryCreateWithoutUserInput[] | UserDietaryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDietaryCreateOrConnectWithoutUserInput | UserDietaryCreateOrConnectWithoutUserInput[]
    upsert?: UserDietaryUpsertWithWhereUniqueWithoutUserInput | UserDietaryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserDietaryCreateManyUserInputEnvelope
    set?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
    disconnect?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
    delete?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
    connect?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
    update?: UserDietaryUpdateWithWhereUniqueWithoutUserInput | UserDietaryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserDietaryUpdateManyWithWhereWithoutUserInput | UserDietaryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserDietaryScalarWhereInput | UserDietaryScalarWhereInput[]
  }

  export type UserMealPlanUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserMealPlanCreateWithoutUserInput, UserMealPlanUncheckedCreateWithoutUserInput> | UserMealPlanCreateWithoutUserInput[] | UserMealPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserMealPlanCreateOrConnectWithoutUserInput | UserMealPlanCreateOrConnectWithoutUserInput[]
    upsert?: UserMealPlanUpsertWithWhereUniqueWithoutUserInput | UserMealPlanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserMealPlanCreateManyUserInputEnvelope
    set?: UserMealPlanWhereUniqueInput | UserMealPlanWhereUniqueInput[]
    disconnect?: UserMealPlanWhereUniqueInput | UserMealPlanWhereUniqueInput[]
    delete?: UserMealPlanWhereUniqueInput | UserMealPlanWhereUniqueInput[]
    connect?: UserMealPlanWhereUniqueInput | UserMealPlanWhereUniqueInput[]
    update?: UserMealPlanUpdateWithWhereUniqueWithoutUserInput | UserMealPlanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserMealPlanUpdateManyWithWhereWithoutUserInput | UserMealPlanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserMealPlanScalarWhereInput | UserMealPlanScalarWhereInput[]
  }

  export type UserCalorieLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserCalorieLogCreateWithoutUserInput, UserCalorieLogUncheckedCreateWithoutUserInput> | UserCalorieLogCreateWithoutUserInput[] | UserCalorieLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCalorieLogCreateOrConnectWithoutUserInput | UserCalorieLogCreateOrConnectWithoutUserInput[]
    upsert?: UserCalorieLogUpsertWithWhereUniqueWithoutUserInput | UserCalorieLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserCalorieLogCreateManyUserInputEnvelope
    set?: UserCalorieLogWhereUniqueInput | UserCalorieLogWhereUniqueInput[]
    disconnect?: UserCalorieLogWhereUniqueInput | UserCalorieLogWhereUniqueInput[]
    delete?: UserCalorieLogWhereUniqueInput | UserCalorieLogWhereUniqueInput[]
    connect?: UserCalorieLogWhereUniqueInput | UserCalorieLogWhereUniqueInput[]
    update?: UserCalorieLogUpdateWithWhereUniqueWithoutUserInput | UserCalorieLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserCalorieLogUpdateManyWithWhereWithoutUserInput | UserCalorieLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserCalorieLogScalarWhereInput | UserCalorieLogScalarWhereInput[]
  }

  export type RestaurantReviewUpdateManyWithoutUserNestedInput = {
    create?: XOR<RestaurantReviewCreateWithoutUserInput, RestaurantReviewUncheckedCreateWithoutUserInput> | RestaurantReviewCreateWithoutUserInput[] | RestaurantReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RestaurantReviewCreateOrConnectWithoutUserInput | RestaurantReviewCreateOrConnectWithoutUserInput[]
    upsert?: RestaurantReviewUpsertWithWhereUniqueWithoutUserInput | RestaurantReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RestaurantReviewCreateManyUserInputEnvelope
    set?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
    disconnect?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
    delete?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
    connect?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
    update?: RestaurantReviewUpdateWithWhereUniqueWithoutUserInput | RestaurantReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RestaurantReviewUpdateManyWithWhereWithoutUserInput | RestaurantReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RestaurantReviewScalarWhereInput | RestaurantReviewScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserLocationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserLocationCreateWithoutUserInput, UserLocationUncheckedCreateWithoutUserInput> | UserLocationCreateWithoutUserInput[] | UserLocationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserLocationCreateOrConnectWithoutUserInput | UserLocationCreateOrConnectWithoutUserInput[]
    upsert?: UserLocationUpsertWithWhereUniqueWithoutUserInput | UserLocationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserLocationCreateManyUserInputEnvelope
    set?: UserLocationWhereUniqueInput | UserLocationWhereUniqueInput[]
    disconnect?: UserLocationWhereUniqueInput | UserLocationWhereUniqueInput[]
    delete?: UserLocationWhereUniqueInput | UserLocationWhereUniqueInput[]
    connect?: UserLocationWhereUniqueInput | UserLocationWhereUniqueInput[]
    update?: UserLocationUpdateWithWhereUniqueWithoutUserInput | UserLocationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserLocationUpdateManyWithWhereWithoutUserInput | UserLocationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserLocationScalarWhereInput | UserLocationScalarWhereInput[]
  }

  export type UserDietaryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserDietaryCreateWithoutUserInput, UserDietaryUncheckedCreateWithoutUserInput> | UserDietaryCreateWithoutUserInput[] | UserDietaryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDietaryCreateOrConnectWithoutUserInput | UserDietaryCreateOrConnectWithoutUserInput[]
    upsert?: UserDietaryUpsertWithWhereUniqueWithoutUserInput | UserDietaryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserDietaryCreateManyUserInputEnvelope
    set?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
    disconnect?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
    delete?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
    connect?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
    update?: UserDietaryUpdateWithWhereUniqueWithoutUserInput | UserDietaryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserDietaryUpdateManyWithWhereWithoutUserInput | UserDietaryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserDietaryScalarWhereInput | UserDietaryScalarWhereInput[]
  }

  export type UserMealPlanUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserMealPlanCreateWithoutUserInput, UserMealPlanUncheckedCreateWithoutUserInput> | UserMealPlanCreateWithoutUserInput[] | UserMealPlanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserMealPlanCreateOrConnectWithoutUserInput | UserMealPlanCreateOrConnectWithoutUserInput[]
    upsert?: UserMealPlanUpsertWithWhereUniqueWithoutUserInput | UserMealPlanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserMealPlanCreateManyUserInputEnvelope
    set?: UserMealPlanWhereUniqueInput | UserMealPlanWhereUniqueInput[]
    disconnect?: UserMealPlanWhereUniqueInput | UserMealPlanWhereUniqueInput[]
    delete?: UserMealPlanWhereUniqueInput | UserMealPlanWhereUniqueInput[]
    connect?: UserMealPlanWhereUniqueInput | UserMealPlanWhereUniqueInput[]
    update?: UserMealPlanUpdateWithWhereUniqueWithoutUserInput | UserMealPlanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserMealPlanUpdateManyWithWhereWithoutUserInput | UserMealPlanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserMealPlanScalarWhereInput | UserMealPlanScalarWhereInput[]
  }

  export type UserCalorieLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserCalorieLogCreateWithoutUserInput, UserCalorieLogUncheckedCreateWithoutUserInput> | UserCalorieLogCreateWithoutUserInput[] | UserCalorieLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCalorieLogCreateOrConnectWithoutUserInput | UserCalorieLogCreateOrConnectWithoutUserInput[]
    upsert?: UserCalorieLogUpsertWithWhereUniqueWithoutUserInput | UserCalorieLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserCalorieLogCreateManyUserInputEnvelope
    set?: UserCalorieLogWhereUniqueInput | UserCalorieLogWhereUniqueInput[]
    disconnect?: UserCalorieLogWhereUniqueInput | UserCalorieLogWhereUniqueInput[]
    delete?: UserCalorieLogWhereUniqueInput | UserCalorieLogWhereUniqueInput[]
    connect?: UserCalorieLogWhereUniqueInput | UserCalorieLogWhereUniqueInput[]
    update?: UserCalorieLogUpdateWithWhereUniqueWithoutUserInput | UserCalorieLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserCalorieLogUpdateManyWithWhereWithoutUserInput | UserCalorieLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserCalorieLogScalarWhereInput | UserCalorieLogScalarWhereInput[]
  }

  export type RestaurantReviewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RestaurantReviewCreateWithoutUserInput, RestaurantReviewUncheckedCreateWithoutUserInput> | RestaurantReviewCreateWithoutUserInput[] | RestaurantReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RestaurantReviewCreateOrConnectWithoutUserInput | RestaurantReviewCreateOrConnectWithoutUserInput[]
    upsert?: RestaurantReviewUpsertWithWhereUniqueWithoutUserInput | RestaurantReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RestaurantReviewCreateManyUserInputEnvelope
    set?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
    disconnect?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
    delete?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
    connect?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
    update?: RestaurantReviewUpdateWithWhereUniqueWithoutUserInput | RestaurantReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RestaurantReviewUpdateManyWithWhereWithoutUserInput | RestaurantReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RestaurantReviewScalarWhereInput | RestaurantReviewScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutLocationsInput = {
    create?: XOR<UserCreateWithoutLocationsInput, UserUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLocationsInput
    connect?: UserWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutLocationsNestedInput = {
    create?: XOR<UserCreateWithoutLocationsInput, UserUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutLocationsInput
    upsert?: UserUpsertWithoutLocationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLocationsInput, UserUpdateWithoutLocationsInput>, UserUncheckedUpdateWithoutLocationsInput>
  }

  export type UserDietaryCreateNestedManyWithoutDietaryInput = {
    create?: XOR<UserDietaryCreateWithoutDietaryInput, UserDietaryUncheckedCreateWithoutDietaryInput> | UserDietaryCreateWithoutDietaryInput[] | UserDietaryUncheckedCreateWithoutDietaryInput[]
    connectOrCreate?: UserDietaryCreateOrConnectWithoutDietaryInput | UserDietaryCreateOrConnectWithoutDietaryInput[]
    createMany?: UserDietaryCreateManyDietaryInputEnvelope
    connect?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
  }

  export type DishDietaryCreateNestedManyWithoutDietaryInput = {
    create?: XOR<DishDietaryCreateWithoutDietaryInput, DishDietaryUncheckedCreateWithoutDietaryInput> | DishDietaryCreateWithoutDietaryInput[] | DishDietaryUncheckedCreateWithoutDietaryInput[]
    connectOrCreate?: DishDietaryCreateOrConnectWithoutDietaryInput | DishDietaryCreateOrConnectWithoutDietaryInput[]
    createMany?: DishDietaryCreateManyDietaryInputEnvelope
    connect?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
  }

  export type UserDietaryUncheckedCreateNestedManyWithoutDietaryInput = {
    create?: XOR<UserDietaryCreateWithoutDietaryInput, UserDietaryUncheckedCreateWithoutDietaryInput> | UserDietaryCreateWithoutDietaryInput[] | UserDietaryUncheckedCreateWithoutDietaryInput[]
    connectOrCreate?: UserDietaryCreateOrConnectWithoutDietaryInput | UserDietaryCreateOrConnectWithoutDietaryInput[]
    createMany?: UserDietaryCreateManyDietaryInputEnvelope
    connect?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
  }

  export type DishDietaryUncheckedCreateNestedManyWithoutDietaryInput = {
    create?: XOR<DishDietaryCreateWithoutDietaryInput, DishDietaryUncheckedCreateWithoutDietaryInput> | DishDietaryCreateWithoutDietaryInput[] | DishDietaryUncheckedCreateWithoutDietaryInput[]
    connectOrCreate?: DishDietaryCreateOrConnectWithoutDietaryInput | DishDietaryCreateOrConnectWithoutDietaryInput[]
    createMany?: DishDietaryCreateManyDietaryInputEnvelope
    connect?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
  }

  export type UserDietaryUpdateManyWithoutDietaryNestedInput = {
    create?: XOR<UserDietaryCreateWithoutDietaryInput, UserDietaryUncheckedCreateWithoutDietaryInput> | UserDietaryCreateWithoutDietaryInput[] | UserDietaryUncheckedCreateWithoutDietaryInput[]
    connectOrCreate?: UserDietaryCreateOrConnectWithoutDietaryInput | UserDietaryCreateOrConnectWithoutDietaryInput[]
    upsert?: UserDietaryUpsertWithWhereUniqueWithoutDietaryInput | UserDietaryUpsertWithWhereUniqueWithoutDietaryInput[]
    createMany?: UserDietaryCreateManyDietaryInputEnvelope
    set?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
    disconnect?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
    delete?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
    connect?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
    update?: UserDietaryUpdateWithWhereUniqueWithoutDietaryInput | UserDietaryUpdateWithWhereUniqueWithoutDietaryInput[]
    updateMany?: UserDietaryUpdateManyWithWhereWithoutDietaryInput | UserDietaryUpdateManyWithWhereWithoutDietaryInput[]
    deleteMany?: UserDietaryScalarWhereInput | UserDietaryScalarWhereInput[]
  }

  export type DishDietaryUpdateManyWithoutDietaryNestedInput = {
    create?: XOR<DishDietaryCreateWithoutDietaryInput, DishDietaryUncheckedCreateWithoutDietaryInput> | DishDietaryCreateWithoutDietaryInput[] | DishDietaryUncheckedCreateWithoutDietaryInput[]
    connectOrCreate?: DishDietaryCreateOrConnectWithoutDietaryInput | DishDietaryCreateOrConnectWithoutDietaryInput[]
    upsert?: DishDietaryUpsertWithWhereUniqueWithoutDietaryInput | DishDietaryUpsertWithWhereUniqueWithoutDietaryInput[]
    createMany?: DishDietaryCreateManyDietaryInputEnvelope
    set?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
    disconnect?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
    delete?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
    connect?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
    update?: DishDietaryUpdateWithWhereUniqueWithoutDietaryInput | DishDietaryUpdateWithWhereUniqueWithoutDietaryInput[]
    updateMany?: DishDietaryUpdateManyWithWhereWithoutDietaryInput | DishDietaryUpdateManyWithWhereWithoutDietaryInput[]
    deleteMany?: DishDietaryScalarWhereInput | DishDietaryScalarWhereInput[]
  }

  export type UserDietaryUncheckedUpdateManyWithoutDietaryNestedInput = {
    create?: XOR<UserDietaryCreateWithoutDietaryInput, UserDietaryUncheckedCreateWithoutDietaryInput> | UserDietaryCreateWithoutDietaryInput[] | UserDietaryUncheckedCreateWithoutDietaryInput[]
    connectOrCreate?: UserDietaryCreateOrConnectWithoutDietaryInput | UserDietaryCreateOrConnectWithoutDietaryInput[]
    upsert?: UserDietaryUpsertWithWhereUniqueWithoutDietaryInput | UserDietaryUpsertWithWhereUniqueWithoutDietaryInput[]
    createMany?: UserDietaryCreateManyDietaryInputEnvelope
    set?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
    disconnect?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
    delete?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
    connect?: UserDietaryWhereUniqueInput | UserDietaryWhereUniqueInput[]
    update?: UserDietaryUpdateWithWhereUniqueWithoutDietaryInput | UserDietaryUpdateWithWhereUniqueWithoutDietaryInput[]
    updateMany?: UserDietaryUpdateManyWithWhereWithoutDietaryInput | UserDietaryUpdateManyWithWhereWithoutDietaryInput[]
    deleteMany?: UserDietaryScalarWhereInput | UserDietaryScalarWhereInput[]
  }

  export type DishDietaryUncheckedUpdateManyWithoutDietaryNestedInput = {
    create?: XOR<DishDietaryCreateWithoutDietaryInput, DishDietaryUncheckedCreateWithoutDietaryInput> | DishDietaryCreateWithoutDietaryInput[] | DishDietaryUncheckedCreateWithoutDietaryInput[]
    connectOrCreate?: DishDietaryCreateOrConnectWithoutDietaryInput | DishDietaryCreateOrConnectWithoutDietaryInput[]
    upsert?: DishDietaryUpsertWithWhereUniqueWithoutDietaryInput | DishDietaryUpsertWithWhereUniqueWithoutDietaryInput[]
    createMany?: DishDietaryCreateManyDietaryInputEnvelope
    set?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
    disconnect?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
    delete?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
    connect?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
    update?: DishDietaryUpdateWithWhereUniqueWithoutDietaryInput | DishDietaryUpdateWithWhereUniqueWithoutDietaryInput[]
    updateMany?: DishDietaryUpdateManyWithWhereWithoutDietaryInput | DishDietaryUpdateManyWithWhereWithoutDietaryInput[]
    deleteMany?: DishDietaryScalarWhereInput | DishDietaryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutUserDietariesInput = {
    create?: XOR<UserCreateWithoutUserDietariesInput, UserUncheckedCreateWithoutUserDietariesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserDietariesInput
    connect?: UserWhereUniqueInput
  }

  export type DietaryRestrictionCreateNestedOneWithoutUserDietariesInput = {
    create?: XOR<DietaryRestrictionCreateWithoutUserDietariesInput, DietaryRestrictionUncheckedCreateWithoutUserDietariesInput>
    connectOrCreate?: DietaryRestrictionCreateOrConnectWithoutUserDietariesInput
    connect?: DietaryRestrictionWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUserDietariesNestedInput = {
    create?: XOR<UserCreateWithoutUserDietariesInput, UserUncheckedCreateWithoutUserDietariesInput>
    connectOrCreate?: UserCreateOrConnectWithoutUserDietariesInput
    upsert?: UserUpsertWithoutUserDietariesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUserDietariesInput, UserUpdateWithoutUserDietariesInput>, UserUncheckedUpdateWithoutUserDietariesInput>
  }

  export type DietaryRestrictionUpdateOneRequiredWithoutUserDietariesNestedInput = {
    create?: XOR<DietaryRestrictionCreateWithoutUserDietariesInput, DietaryRestrictionUncheckedCreateWithoutUserDietariesInput>
    connectOrCreate?: DietaryRestrictionCreateOrConnectWithoutUserDietariesInput
    upsert?: DietaryRestrictionUpsertWithoutUserDietariesInput
    connect?: DietaryRestrictionWhereUniqueInput
    update?: XOR<XOR<DietaryRestrictionUpdateToOneWithWhereWithoutUserDietariesInput, DietaryRestrictionUpdateWithoutUserDietariesInput>, DietaryRestrictionUncheckedUpdateWithoutUserDietariesInput>
  }

  export type DishCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<DishCreateWithoutRestaurantInput, DishUncheckedCreateWithoutRestaurantInput> | DishCreateWithoutRestaurantInput[] | DishUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: DishCreateOrConnectWithoutRestaurantInput | DishCreateOrConnectWithoutRestaurantInput[]
    createMany?: DishCreateManyRestaurantInputEnvelope
    connect?: DishWhereUniqueInput | DishWhereUniqueInput[]
  }

  export type RestaurantCuisineCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<RestaurantCuisineCreateWithoutRestaurantInput, RestaurantCuisineUncheckedCreateWithoutRestaurantInput> | RestaurantCuisineCreateWithoutRestaurantInput[] | RestaurantCuisineUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: RestaurantCuisineCreateOrConnectWithoutRestaurantInput | RestaurantCuisineCreateOrConnectWithoutRestaurantInput[]
    createMany?: RestaurantCuisineCreateManyRestaurantInputEnvelope
    connect?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
  }

  export type RestaurantReviewCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<RestaurantReviewCreateWithoutRestaurantInput, RestaurantReviewUncheckedCreateWithoutRestaurantInput> | RestaurantReviewCreateWithoutRestaurantInput[] | RestaurantReviewUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: RestaurantReviewCreateOrConnectWithoutRestaurantInput | RestaurantReviewCreateOrConnectWithoutRestaurantInput[]
    createMany?: RestaurantReviewCreateManyRestaurantInputEnvelope
    connect?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
  }

  export type DishUncheckedCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<DishCreateWithoutRestaurantInput, DishUncheckedCreateWithoutRestaurantInput> | DishCreateWithoutRestaurantInput[] | DishUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: DishCreateOrConnectWithoutRestaurantInput | DishCreateOrConnectWithoutRestaurantInput[]
    createMany?: DishCreateManyRestaurantInputEnvelope
    connect?: DishWhereUniqueInput | DishWhereUniqueInput[]
  }

  export type RestaurantCuisineUncheckedCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<RestaurantCuisineCreateWithoutRestaurantInput, RestaurantCuisineUncheckedCreateWithoutRestaurantInput> | RestaurantCuisineCreateWithoutRestaurantInput[] | RestaurantCuisineUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: RestaurantCuisineCreateOrConnectWithoutRestaurantInput | RestaurantCuisineCreateOrConnectWithoutRestaurantInput[]
    createMany?: RestaurantCuisineCreateManyRestaurantInputEnvelope
    connect?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
  }

  export type RestaurantReviewUncheckedCreateNestedManyWithoutRestaurantInput = {
    create?: XOR<RestaurantReviewCreateWithoutRestaurantInput, RestaurantReviewUncheckedCreateWithoutRestaurantInput> | RestaurantReviewCreateWithoutRestaurantInput[] | RestaurantReviewUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: RestaurantReviewCreateOrConnectWithoutRestaurantInput | RestaurantReviewCreateOrConnectWithoutRestaurantInput[]
    createMany?: RestaurantReviewCreateManyRestaurantInputEnvelope
    connect?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DishUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<DishCreateWithoutRestaurantInput, DishUncheckedCreateWithoutRestaurantInput> | DishCreateWithoutRestaurantInput[] | DishUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: DishCreateOrConnectWithoutRestaurantInput | DishCreateOrConnectWithoutRestaurantInput[]
    upsert?: DishUpsertWithWhereUniqueWithoutRestaurantInput | DishUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: DishCreateManyRestaurantInputEnvelope
    set?: DishWhereUniqueInput | DishWhereUniqueInput[]
    disconnect?: DishWhereUniqueInput | DishWhereUniqueInput[]
    delete?: DishWhereUniqueInput | DishWhereUniqueInput[]
    connect?: DishWhereUniqueInput | DishWhereUniqueInput[]
    update?: DishUpdateWithWhereUniqueWithoutRestaurantInput | DishUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: DishUpdateManyWithWhereWithoutRestaurantInput | DishUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: DishScalarWhereInput | DishScalarWhereInput[]
  }

  export type RestaurantCuisineUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<RestaurantCuisineCreateWithoutRestaurantInput, RestaurantCuisineUncheckedCreateWithoutRestaurantInput> | RestaurantCuisineCreateWithoutRestaurantInput[] | RestaurantCuisineUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: RestaurantCuisineCreateOrConnectWithoutRestaurantInput | RestaurantCuisineCreateOrConnectWithoutRestaurantInput[]
    upsert?: RestaurantCuisineUpsertWithWhereUniqueWithoutRestaurantInput | RestaurantCuisineUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: RestaurantCuisineCreateManyRestaurantInputEnvelope
    set?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
    disconnect?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
    delete?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
    connect?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
    update?: RestaurantCuisineUpdateWithWhereUniqueWithoutRestaurantInput | RestaurantCuisineUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: RestaurantCuisineUpdateManyWithWhereWithoutRestaurantInput | RestaurantCuisineUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: RestaurantCuisineScalarWhereInput | RestaurantCuisineScalarWhereInput[]
  }

  export type RestaurantReviewUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<RestaurantReviewCreateWithoutRestaurantInput, RestaurantReviewUncheckedCreateWithoutRestaurantInput> | RestaurantReviewCreateWithoutRestaurantInput[] | RestaurantReviewUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: RestaurantReviewCreateOrConnectWithoutRestaurantInput | RestaurantReviewCreateOrConnectWithoutRestaurantInput[]
    upsert?: RestaurantReviewUpsertWithWhereUniqueWithoutRestaurantInput | RestaurantReviewUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: RestaurantReviewCreateManyRestaurantInputEnvelope
    set?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
    disconnect?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
    delete?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
    connect?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
    update?: RestaurantReviewUpdateWithWhereUniqueWithoutRestaurantInput | RestaurantReviewUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: RestaurantReviewUpdateManyWithWhereWithoutRestaurantInput | RestaurantReviewUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: RestaurantReviewScalarWhereInput | RestaurantReviewScalarWhereInput[]
  }

  export type DishUncheckedUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<DishCreateWithoutRestaurantInput, DishUncheckedCreateWithoutRestaurantInput> | DishCreateWithoutRestaurantInput[] | DishUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: DishCreateOrConnectWithoutRestaurantInput | DishCreateOrConnectWithoutRestaurantInput[]
    upsert?: DishUpsertWithWhereUniqueWithoutRestaurantInput | DishUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: DishCreateManyRestaurantInputEnvelope
    set?: DishWhereUniqueInput | DishWhereUniqueInput[]
    disconnect?: DishWhereUniqueInput | DishWhereUniqueInput[]
    delete?: DishWhereUniqueInput | DishWhereUniqueInput[]
    connect?: DishWhereUniqueInput | DishWhereUniqueInput[]
    update?: DishUpdateWithWhereUniqueWithoutRestaurantInput | DishUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: DishUpdateManyWithWhereWithoutRestaurantInput | DishUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: DishScalarWhereInput | DishScalarWhereInput[]
  }

  export type RestaurantCuisineUncheckedUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<RestaurantCuisineCreateWithoutRestaurantInput, RestaurantCuisineUncheckedCreateWithoutRestaurantInput> | RestaurantCuisineCreateWithoutRestaurantInput[] | RestaurantCuisineUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: RestaurantCuisineCreateOrConnectWithoutRestaurantInput | RestaurantCuisineCreateOrConnectWithoutRestaurantInput[]
    upsert?: RestaurantCuisineUpsertWithWhereUniqueWithoutRestaurantInput | RestaurantCuisineUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: RestaurantCuisineCreateManyRestaurantInputEnvelope
    set?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
    disconnect?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
    delete?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
    connect?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
    update?: RestaurantCuisineUpdateWithWhereUniqueWithoutRestaurantInput | RestaurantCuisineUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: RestaurantCuisineUpdateManyWithWhereWithoutRestaurantInput | RestaurantCuisineUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: RestaurantCuisineScalarWhereInput | RestaurantCuisineScalarWhereInput[]
  }

  export type RestaurantReviewUncheckedUpdateManyWithoutRestaurantNestedInput = {
    create?: XOR<RestaurantReviewCreateWithoutRestaurantInput, RestaurantReviewUncheckedCreateWithoutRestaurantInput> | RestaurantReviewCreateWithoutRestaurantInput[] | RestaurantReviewUncheckedCreateWithoutRestaurantInput[]
    connectOrCreate?: RestaurantReviewCreateOrConnectWithoutRestaurantInput | RestaurantReviewCreateOrConnectWithoutRestaurantInput[]
    upsert?: RestaurantReviewUpsertWithWhereUniqueWithoutRestaurantInput | RestaurantReviewUpsertWithWhereUniqueWithoutRestaurantInput[]
    createMany?: RestaurantReviewCreateManyRestaurantInputEnvelope
    set?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
    disconnect?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
    delete?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
    connect?: RestaurantReviewWhereUniqueInput | RestaurantReviewWhereUniqueInput[]
    update?: RestaurantReviewUpdateWithWhereUniqueWithoutRestaurantInput | RestaurantReviewUpdateWithWhereUniqueWithoutRestaurantInput[]
    updateMany?: RestaurantReviewUpdateManyWithWhereWithoutRestaurantInput | RestaurantReviewUpdateManyWithWhereWithoutRestaurantInput[]
    deleteMany?: RestaurantReviewScalarWhereInput | RestaurantReviewScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRestaurantReviewsInput = {
    create?: XOR<UserCreateWithoutRestaurantReviewsInput, UserUncheckedCreateWithoutRestaurantReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRestaurantReviewsInput
    connect?: UserWhereUniqueInput
  }

  export type RestaurantCreateNestedOneWithoutRestaurantReviewsInput = {
    create?: XOR<RestaurantCreateWithoutRestaurantReviewsInput, RestaurantUncheckedCreateWithoutRestaurantReviewsInput>
    connectOrCreate?: RestaurantCreateOrConnectWithoutRestaurantReviewsInput
    connect?: RestaurantWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRestaurantReviewsNestedInput = {
    create?: XOR<UserCreateWithoutRestaurantReviewsInput, UserUncheckedCreateWithoutRestaurantReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRestaurantReviewsInput
    upsert?: UserUpsertWithoutRestaurantReviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRestaurantReviewsInput, UserUpdateWithoutRestaurantReviewsInput>, UserUncheckedUpdateWithoutRestaurantReviewsInput>
  }

  export type RestaurantUpdateOneRequiredWithoutRestaurantReviewsNestedInput = {
    create?: XOR<RestaurantCreateWithoutRestaurantReviewsInput, RestaurantUncheckedCreateWithoutRestaurantReviewsInput>
    connectOrCreate?: RestaurantCreateOrConnectWithoutRestaurantReviewsInput
    upsert?: RestaurantUpsertWithoutRestaurantReviewsInput
    connect?: RestaurantWhereUniqueInput
    update?: XOR<XOR<RestaurantUpdateToOneWithWhereWithoutRestaurantReviewsInput, RestaurantUpdateWithoutRestaurantReviewsInput>, RestaurantUncheckedUpdateWithoutRestaurantReviewsInput>
  }

  export type DishCreateNestedManyWithoutCuisineInput = {
    create?: XOR<DishCreateWithoutCuisineInput, DishUncheckedCreateWithoutCuisineInput> | DishCreateWithoutCuisineInput[] | DishUncheckedCreateWithoutCuisineInput[]
    connectOrCreate?: DishCreateOrConnectWithoutCuisineInput | DishCreateOrConnectWithoutCuisineInput[]
    createMany?: DishCreateManyCuisineInputEnvelope
    connect?: DishWhereUniqueInput | DishWhereUniqueInput[]
  }

  export type RestaurantCuisineCreateNestedManyWithoutCuisineInput = {
    create?: XOR<RestaurantCuisineCreateWithoutCuisineInput, RestaurantCuisineUncheckedCreateWithoutCuisineInput> | RestaurantCuisineCreateWithoutCuisineInput[] | RestaurantCuisineUncheckedCreateWithoutCuisineInput[]
    connectOrCreate?: RestaurantCuisineCreateOrConnectWithoutCuisineInput | RestaurantCuisineCreateOrConnectWithoutCuisineInput[]
    createMany?: RestaurantCuisineCreateManyCuisineInputEnvelope
    connect?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
  }

  export type DishUncheckedCreateNestedManyWithoutCuisineInput = {
    create?: XOR<DishCreateWithoutCuisineInput, DishUncheckedCreateWithoutCuisineInput> | DishCreateWithoutCuisineInput[] | DishUncheckedCreateWithoutCuisineInput[]
    connectOrCreate?: DishCreateOrConnectWithoutCuisineInput | DishCreateOrConnectWithoutCuisineInput[]
    createMany?: DishCreateManyCuisineInputEnvelope
    connect?: DishWhereUniqueInput | DishWhereUniqueInput[]
  }

  export type RestaurantCuisineUncheckedCreateNestedManyWithoutCuisineInput = {
    create?: XOR<RestaurantCuisineCreateWithoutCuisineInput, RestaurantCuisineUncheckedCreateWithoutCuisineInput> | RestaurantCuisineCreateWithoutCuisineInput[] | RestaurantCuisineUncheckedCreateWithoutCuisineInput[]
    connectOrCreate?: RestaurantCuisineCreateOrConnectWithoutCuisineInput | RestaurantCuisineCreateOrConnectWithoutCuisineInput[]
    createMany?: RestaurantCuisineCreateManyCuisineInputEnvelope
    connect?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
  }

  export type DishUpdateManyWithoutCuisineNestedInput = {
    create?: XOR<DishCreateWithoutCuisineInput, DishUncheckedCreateWithoutCuisineInput> | DishCreateWithoutCuisineInput[] | DishUncheckedCreateWithoutCuisineInput[]
    connectOrCreate?: DishCreateOrConnectWithoutCuisineInput | DishCreateOrConnectWithoutCuisineInput[]
    upsert?: DishUpsertWithWhereUniqueWithoutCuisineInput | DishUpsertWithWhereUniqueWithoutCuisineInput[]
    createMany?: DishCreateManyCuisineInputEnvelope
    set?: DishWhereUniqueInput | DishWhereUniqueInput[]
    disconnect?: DishWhereUniqueInput | DishWhereUniqueInput[]
    delete?: DishWhereUniqueInput | DishWhereUniqueInput[]
    connect?: DishWhereUniqueInput | DishWhereUniqueInput[]
    update?: DishUpdateWithWhereUniqueWithoutCuisineInput | DishUpdateWithWhereUniqueWithoutCuisineInput[]
    updateMany?: DishUpdateManyWithWhereWithoutCuisineInput | DishUpdateManyWithWhereWithoutCuisineInput[]
    deleteMany?: DishScalarWhereInput | DishScalarWhereInput[]
  }

  export type RestaurantCuisineUpdateManyWithoutCuisineNestedInput = {
    create?: XOR<RestaurantCuisineCreateWithoutCuisineInput, RestaurantCuisineUncheckedCreateWithoutCuisineInput> | RestaurantCuisineCreateWithoutCuisineInput[] | RestaurantCuisineUncheckedCreateWithoutCuisineInput[]
    connectOrCreate?: RestaurantCuisineCreateOrConnectWithoutCuisineInput | RestaurantCuisineCreateOrConnectWithoutCuisineInput[]
    upsert?: RestaurantCuisineUpsertWithWhereUniqueWithoutCuisineInput | RestaurantCuisineUpsertWithWhereUniqueWithoutCuisineInput[]
    createMany?: RestaurantCuisineCreateManyCuisineInputEnvelope
    set?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
    disconnect?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
    delete?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
    connect?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
    update?: RestaurantCuisineUpdateWithWhereUniqueWithoutCuisineInput | RestaurantCuisineUpdateWithWhereUniqueWithoutCuisineInput[]
    updateMany?: RestaurantCuisineUpdateManyWithWhereWithoutCuisineInput | RestaurantCuisineUpdateManyWithWhereWithoutCuisineInput[]
    deleteMany?: RestaurantCuisineScalarWhereInput | RestaurantCuisineScalarWhereInput[]
  }

  export type DishUncheckedUpdateManyWithoutCuisineNestedInput = {
    create?: XOR<DishCreateWithoutCuisineInput, DishUncheckedCreateWithoutCuisineInput> | DishCreateWithoutCuisineInput[] | DishUncheckedCreateWithoutCuisineInput[]
    connectOrCreate?: DishCreateOrConnectWithoutCuisineInput | DishCreateOrConnectWithoutCuisineInput[]
    upsert?: DishUpsertWithWhereUniqueWithoutCuisineInput | DishUpsertWithWhereUniqueWithoutCuisineInput[]
    createMany?: DishCreateManyCuisineInputEnvelope
    set?: DishWhereUniqueInput | DishWhereUniqueInput[]
    disconnect?: DishWhereUniqueInput | DishWhereUniqueInput[]
    delete?: DishWhereUniqueInput | DishWhereUniqueInput[]
    connect?: DishWhereUniqueInput | DishWhereUniqueInput[]
    update?: DishUpdateWithWhereUniqueWithoutCuisineInput | DishUpdateWithWhereUniqueWithoutCuisineInput[]
    updateMany?: DishUpdateManyWithWhereWithoutCuisineInput | DishUpdateManyWithWhereWithoutCuisineInput[]
    deleteMany?: DishScalarWhereInput | DishScalarWhereInput[]
  }

  export type RestaurantCuisineUncheckedUpdateManyWithoutCuisineNestedInput = {
    create?: XOR<RestaurantCuisineCreateWithoutCuisineInput, RestaurantCuisineUncheckedCreateWithoutCuisineInput> | RestaurantCuisineCreateWithoutCuisineInput[] | RestaurantCuisineUncheckedCreateWithoutCuisineInput[]
    connectOrCreate?: RestaurantCuisineCreateOrConnectWithoutCuisineInput | RestaurantCuisineCreateOrConnectWithoutCuisineInput[]
    upsert?: RestaurantCuisineUpsertWithWhereUniqueWithoutCuisineInput | RestaurantCuisineUpsertWithWhereUniqueWithoutCuisineInput[]
    createMany?: RestaurantCuisineCreateManyCuisineInputEnvelope
    set?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
    disconnect?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
    delete?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
    connect?: RestaurantCuisineWhereUniqueInput | RestaurantCuisineWhereUniqueInput[]
    update?: RestaurantCuisineUpdateWithWhereUniqueWithoutCuisineInput | RestaurantCuisineUpdateWithWhereUniqueWithoutCuisineInput[]
    updateMany?: RestaurantCuisineUpdateManyWithWhereWithoutCuisineInput | RestaurantCuisineUpdateManyWithWhereWithoutCuisineInput[]
    deleteMany?: RestaurantCuisineScalarWhereInput | RestaurantCuisineScalarWhereInput[]
  }

  export type RestaurantCreateNestedOneWithoutRestaurantCuisinesInput = {
    create?: XOR<RestaurantCreateWithoutRestaurantCuisinesInput, RestaurantUncheckedCreateWithoutRestaurantCuisinesInput>
    connectOrCreate?: RestaurantCreateOrConnectWithoutRestaurantCuisinesInput
    connect?: RestaurantWhereUniqueInput
  }

  export type CuisineCreateNestedOneWithoutRestaurantCuisinesInput = {
    create?: XOR<CuisineCreateWithoutRestaurantCuisinesInput, CuisineUncheckedCreateWithoutRestaurantCuisinesInput>
    connectOrCreate?: CuisineCreateOrConnectWithoutRestaurantCuisinesInput
    connect?: CuisineWhereUniqueInput
  }

  export type RestaurantUpdateOneRequiredWithoutRestaurantCuisinesNestedInput = {
    create?: XOR<RestaurantCreateWithoutRestaurantCuisinesInput, RestaurantUncheckedCreateWithoutRestaurantCuisinesInput>
    connectOrCreate?: RestaurantCreateOrConnectWithoutRestaurantCuisinesInput
    upsert?: RestaurantUpsertWithoutRestaurantCuisinesInput
    connect?: RestaurantWhereUniqueInput
    update?: XOR<XOR<RestaurantUpdateToOneWithWhereWithoutRestaurantCuisinesInput, RestaurantUpdateWithoutRestaurantCuisinesInput>, RestaurantUncheckedUpdateWithoutRestaurantCuisinesInput>
  }

  export type CuisineUpdateOneRequiredWithoutRestaurantCuisinesNestedInput = {
    create?: XOR<CuisineCreateWithoutRestaurantCuisinesInput, CuisineUncheckedCreateWithoutRestaurantCuisinesInput>
    connectOrCreate?: CuisineCreateOrConnectWithoutRestaurantCuisinesInput
    upsert?: CuisineUpsertWithoutRestaurantCuisinesInput
    connect?: CuisineWhereUniqueInput
    update?: XOR<XOR<CuisineUpdateToOneWithWhereWithoutRestaurantCuisinesInput, CuisineUpdateWithoutRestaurantCuisinesInput>, CuisineUncheckedUpdateWithoutRestaurantCuisinesInput>
  }

  export type RestaurantCreateNestedOneWithoutDishesInput = {
    create?: XOR<RestaurantCreateWithoutDishesInput, RestaurantUncheckedCreateWithoutDishesInput>
    connectOrCreate?: RestaurantCreateOrConnectWithoutDishesInput
    connect?: RestaurantWhereUniqueInput
  }

  export type CuisineCreateNestedOneWithoutDishesInput = {
    create?: XOR<CuisineCreateWithoutDishesInput, CuisineUncheckedCreateWithoutDishesInput>
    connectOrCreate?: CuisineCreateOrConnectWithoutDishesInput
    connect?: CuisineWhereUniqueInput
  }

  export type DishDietaryCreateNestedManyWithoutDishInput = {
    create?: XOR<DishDietaryCreateWithoutDishInput, DishDietaryUncheckedCreateWithoutDishInput> | DishDietaryCreateWithoutDishInput[] | DishDietaryUncheckedCreateWithoutDishInput[]
    connectOrCreate?: DishDietaryCreateOrConnectWithoutDishInput | DishDietaryCreateOrConnectWithoutDishInput[]
    createMany?: DishDietaryCreateManyDishInputEnvelope
    connect?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
  }

  export type MealPlanDishCreateNestedManyWithoutDishInput = {
    create?: XOR<MealPlanDishCreateWithoutDishInput, MealPlanDishUncheckedCreateWithoutDishInput> | MealPlanDishCreateWithoutDishInput[] | MealPlanDishUncheckedCreateWithoutDishInput[]
    connectOrCreate?: MealPlanDishCreateOrConnectWithoutDishInput | MealPlanDishCreateOrConnectWithoutDishInput[]
    createMany?: MealPlanDishCreateManyDishInputEnvelope
    connect?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
  }

  export type DishDietaryUncheckedCreateNestedManyWithoutDishInput = {
    create?: XOR<DishDietaryCreateWithoutDishInput, DishDietaryUncheckedCreateWithoutDishInput> | DishDietaryCreateWithoutDishInput[] | DishDietaryUncheckedCreateWithoutDishInput[]
    connectOrCreate?: DishDietaryCreateOrConnectWithoutDishInput | DishDietaryCreateOrConnectWithoutDishInput[]
    createMany?: DishDietaryCreateManyDishInputEnvelope
    connect?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
  }

  export type MealPlanDishUncheckedCreateNestedManyWithoutDishInput = {
    create?: XOR<MealPlanDishCreateWithoutDishInput, MealPlanDishUncheckedCreateWithoutDishInput> | MealPlanDishCreateWithoutDishInput[] | MealPlanDishUncheckedCreateWithoutDishInput[]
    connectOrCreate?: MealPlanDishCreateOrConnectWithoutDishInput | MealPlanDishCreateOrConnectWithoutDishInput[]
    createMany?: MealPlanDishCreateManyDishInputEnvelope
    connect?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RestaurantUpdateOneRequiredWithoutDishesNestedInput = {
    create?: XOR<RestaurantCreateWithoutDishesInput, RestaurantUncheckedCreateWithoutDishesInput>
    connectOrCreate?: RestaurantCreateOrConnectWithoutDishesInput
    upsert?: RestaurantUpsertWithoutDishesInput
    connect?: RestaurantWhereUniqueInput
    update?: XOR<XOR<RestaurantUpdateToOneWithWhereWithoutDishesInput, RestaurantUpdateWithoutDishesInput>, RestaurantUncheckedUpdateWithoutDishesInput>
  }

  export type CuisineUpdateOneWithoutDishesNestedInput = {
    create?: XOR<CuisineCreateWithoutDishesInput, CuisineUncheckedCreateWithoutDishesInput>
    connectOrCreate?: CuisineCreateOrConnectWithoutDishesInput
    upsert?: CuisineUpsertWithoutDishesInput
    disconnect?: CuisineWhereInput | boolean
    delete?: CuisineWhereInput | boolean
    connect?: CuisineWhereUniqueInput
    update?: XOR<XOR<CuisineUpdateToOneWithWhereWithoutDishesInput, CuisineUpdateWithoutDishesInput>, CuisineUncheckedUpdateWithoutDishesInput>
  }

  export type DishDietaryUpdateManyWithoutDishNestedInput = {
    create?: XOR<DishDietaryCreateWithoutDishInput, DishDietaryUncheckedCreateWithoutDishInput> | DishDietaryCreateWithoutDishInput[] | DishDietaryUncheckedCreateWithoutDishInput[]
    connectOrCreate?: DishDietaryCreateOrConnectWithoutDishInput | DishDietaryCreateOrConnectWithoutDishInput[]
    upsert?: DishDietaryUpsertWithWhereUniqueWithoutDishInput | DishDietaryUpsertWithWhereUniqueWithoutDishInput[]
    createMany?: DishDietaryCreateManyDishInputEnvelope
    set?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
    disconnect?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
    delete?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
    connect?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
    update?: DishDietaryUpdateWithWhereUniqueWithoutDishInput | DishDietaryUpdateWithWhereUniqueWithoutDishInput[]
    updateMany?: DishDietaryUpdateManyWithWhereWithoutDishInput | DishDietaryUpdateManyWithWhereWithoutDishInput[]
    deleteMany?: DishDietaryScalarWhereInput | DishDietaryScalarWhereInput[]
  }

  export type MealPlanDishUpdateManyWithoutDishNestedInput = {
    create?: XOR<MealPlanDishCreateWithoutDishInput, MealPlanDishUncheckedCreateWithoutDishInput> | MealPlanDishCreateWithoutDishInput[] | MealPlanDishUncheckedCreateWithoutDishInput[]
    connectOrCreate?: MealPlanDishCreateOrConnectWithoutDishInput | MealPlanDishCreateOrConnectWithoutDishInput[]
    upsert?: MealPlanDishUpsertWithWhereUniqueWithoutDishInput | MealPlanDishUpsertWithWhereUniqueWithoutDishInput[]
    createMany?: MealPlanDishCreateManyDishInputEnvelope
    set?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
    disconnect?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
    delete?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
    connect?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
    update?: MealPlanDishUpdateWithWhereUniqueWithoutDishInput | MealPlanDishUpdateWithWhereUniqueWithoutDishInput[]
    updateMany?: MealPlanDishUpdateManyWithWhereWithoutDishInput | MealPlanDishUpdateManyWithWhereWithoutDishInput[]
    deleteMany?: MealPlanDishScalarWhereInput | MealPlanDishScalarWhereInput[]
  }

  export type DishDietaryUncheckedUpdateManyWithoutDishNestedInput = {
    create?: XOR<DishDietaryCreateWithoutDishInput, DishDietaryUncheckedCreateWithoutDishInput> | DishDietaryCreateWithoutDishInput[] | DishDietaryUncheckedCreateWithoutDishInput[]
    connectOrCreate?: DishDietaryCreateOrConnectWithoutDishInput | DishDietaryCreateOrConnectWithoutDishInput[]
    upsert?: DishDietaryUpsertWithWhereUniqueWithoutDishInput | DishDietaryUpsertWithWhereUniqueWithoutDishInput[]
    createMany?: DishDietaryCreateManyDishInputEnvelope
    set?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
    disconnect?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
    delete?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
    connect?: DishDietaryWhereUniqueInput | DishDietaryWhereUniqueInput[]
    update?: DishDietaryUpdateWithWhereUniqueWithoutDishInput | DishDietaryUpdateWithWhereUniqueWithoutDishInput[]
    updateMany?: DishDietaryUpdateManyWithWhereWithoutDishInput | DishDietaryUpdateManyWithWhereWithoutDishInput[]
    deleteMany?: DishDietaryScalarWhereInput | DishDietaryScalarWhereInput[]
  }

  export type MealPlanDishUncheckedUpdateManyWithoutDishNestedInput = {
    create?: XOR<MealPlanDishCreateWithoutDishInput, MealPlanDishUncheckedCreateWithoutDishInput> | MealPlanDishCreateWithoutDishInput[] | MealPlanDishUncheckedCreateWithoutDishInput[]
    connectOrCreate?: MealPlanDishCreateOrConnectWithoutDishInput | MealPlanDishCreateOrConnectWithoutDishInput[]
    upsert?: MealPlanDishUpsertWithWhereUniqueWithoutDishInput | MealPlanDishUpsertWithWhereUniqueWithoutDishInput[]
    createMany?: MealPlanDishCreateManyDishInputEnvelope
    set?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
    disconnect?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
    delete?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
    connect?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
    update?: MealPlanDishUpdateWithWhereUniqueWithoutDishInput | MealPlanDishUpdateWithWhereUniqueWithoutDishInput[]
    updateMany?: MealPlanDishUpdateManyWithWhereWithoutDishInput | MealPlanDishUpdateManyWithWhereWithoutDishInput[]
    deleteMany?: MealPlanDishScalarWhereInput | MealPlanDishScalarWhereInput[]
  }

  export type DishCreateNestedOneWithoutDishDietariesInput = {
    create?: XOR<DishCreateWithoutDishDietariesInput, DishUncheckedCreateWithoutDishDietariesInput>
    connectOrCreate?: DishCreateOrConnectWithoutDishDietariesInput
    connect?: DishWhereUniqueInput
  }

  export type DietaryRestrictionCreateNestedOneWithoutDishDietariesInput = {
    create?: XOR<DietaryRestrictionCreateWithoutDishDietariesInput, DietaryRestrictionUncheckedCreateWithoutDishDietariesInput>
    connectOrCreate?: DietaryRestrictionCreateOrConnectWithoutDishDietariesInput
    connect?: DietaryRestrictionWhereUniqueInput
  }

  export type DishUpdateOneRequiredWithoutDishDietariesNestedInput = {
    create?: XOR<DishCreateWithoutDishDietariesInput, DishUncheckedCreateWithoutDishDietariesInput>
    connectOrCreate?: DishCreateOrConnectWithoutDishDietariesInput
    upsert?: DishUpsertWithoutDishDietariesInput
    connect?: DishWhereUniqueInput
    update?: XOR<XOR<DishUpdateToOneWithWhereWithoutDishDietariesInput, DishUpdateWithoutDishDietariesInput>, DishUncheckedUpdateWithoutDishDietariesInput>
  }

  export type DietaryRestrictionUpdateOneRequiredWithoutDishDietariesNestedInput = {
    create?: XOR<DietaryRestrictionCreateWithoutDishDietariesInput, DietaryRestrictionUncheckedCreateWithoutDishDietariesInput>
    connectOrCreate?: DietaryRestrictionCreateOrConnectWithoutDishDietariesInput
    upsert?: DietaryRestrictionUpsertWithoutDishDietariesInput
    connect?: DietaryRestrictionWhereUniqueInput
    update?: XOR<XOR<DietaryRestrictionUpdateToOneWithWhereWithoutDishDietariesInput, DietaryRestrictionUpdateWithoutDishDietariesInput>, DietaryRestrictionUncheckedUpdateWithoutDishDietariesInput>
  }

  export type UserCreateNestedOneWithoutMealPlansInput = {
    create?: XOR<UserCreateWithoutMealPlansInput, UserUncheckedCreateWithoutMealPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutMealPlansInput
    connect?: UserWhereUniqueInput
  }

  export type MealPlanDishCreateNestedManyWithoutMealPlanInput = {
    create?: XOR<MealPlanDishCreateWithoutMealPlanInput, MealPlanDishUncheckedCreateWithoutMealPlanInput> | MealPlanDishCreateWithoutMealPlanInput[] | MealPlanDishUncheckedCreateWithoutMealPlanInput[]
    connectOrCreate?: MealPlanDishCreateOrConnectWithoutMealPlanInput | MealPlanDishCreateOrConnectWithoutMealPlanInput[]
    createMany?: MealPlanDishCreateManyMealPlanInputEnvelope
    connect?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
  }

  export type MealPlanDishUncheckedCreateNestedManyWithoutMealPlanInput = {
    create?: XOR<MealPlanDishCreateWithoutMealPlanInput, MealPlanDishUncheckedCreateWithoutMealPlanInput> | MealPlanDishCreateWithoutMealPlanInput[] | MealPlanDishUncheckedCreateWithoutMealPlanInput[]
    connectOrCreate?: MealPlanDishCreateOrConnectWithoutMealPlanInput | MealPlanDishCreateOrConnectWithoutMealPlanInput[]
    createMany?: MealPlanDishCreateManyMealPlanInputEnvelope
    connect?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutMealPlansNestedInput = {
    create?: XOR<UserCreateWithoutMealPlansInput, UserUncheckedCreateWithoutMealPlansInput>
    connectOrCreate?: UserCreateOrConnectWithoutMealPlansInput
    upsert?: UserUpsertWithoutMealPlansInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMealPlansInput, UserUpdateWithoutMealPlansInput>, UserUncheckedUpdateWithoutMealPlansInput>
  }

  export type MealPlanDishUpdateManyWithoutMealPlanNestedInput = {
    create?: XOR<MealPlanDishCreateWithoutMealPlanInput, MealPlanDishUncheckedCreateWithoutMealPlanInput> | MealPlanDishCreateWithoutMealPlanInput[] | MealPlanDishUncheckedCreateWithoutMealPlanInput[]
    connectOrCreate?: MealPlanDishCreateOrConnectWithoutMealPlanInput | MealPlanDishCreateOrConnectWithoutMealPlanInput[]
    upsert?: MealPlanDishUpsertWithWhereUniqueWithoutMealPlanInput | MealPlanDishUpsertWithWhereUniqueWithoutMealPlanInput[]
    createMany?: MealPlanDishCreateManyMealPlanInputEnvelope
    set?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
    disconnect?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
    delete?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
    connect?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
    update?: MealPlanDishUpdateWithWhereUniqueWithoutMealPlanInput | MealPlanDishUpdateWithWhereUniqueWithoutMealPlanInput[]
    updateMany?: MealPlanDishUpdateManyWithWhereWithoutMealPlanInput | MealPlanDishUpdateManyWithWhereWithoutMealPlanInput[]
    deleteMany?: MealPlanDishScalarWhereInput | MealPlanDishScalarWhereInput[]
  }

  export type MealPlanDishUncheckedUpdateManyWithoutMealPlanNestedInput = {
    create?: XOR<MealPlanDishCreateWithoutMealPlanInput, MealPlanDishUncheckedCreateWithoutMealPlanInput> | MealPlanDishCreateWithoutMealPlanInput[] | MealPlanDishUncheckedCreateWithoutMealPlanInput[]
    connectOrCreate?: MealPlanDishCreateOrConnectWithoutMealPlanInput | MealPlanDishCreateOrConnectWithoutMealPlanInput[]
    upsert?: MealPlanDishUpsertWithWhereUniqueWithoutMealPlanInput | MealPlanDishUpsertWithWhereUniqueWithoutMealPlanInput[]
    createMany?: MealPlanDishCreateManyMealPlanInputEnvelope
    set?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
    disconnect?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
    delete?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
    connect?: MealPlanDishWhereUniqueInput | MealPlanDishWhereUniqueInput[]
    update?: MealPlanDishUpdateWithWhereUniqueWithoutMealPlanInput | MealPlanDishUpdateWithWhereUniqueWithoutMealPlanInput[]
    updateMany?: MealPlanDishUpdateManyWithWhereWithoutMealPlanInput | MealPlanDishUpdateManyWithWhereWithoutMealPlanInput[]
    deleteMany?: MealPlanDishScalarWhereInput | MealPlanDishScalarWhereInput[]
  }

  export type UserMealPlanCreateNestedOneWithoutMealPlanDishesInput = {
    create?: XOR<UserMealPlanCreateWithoutMealPlanDishesInput, UserMealPlanUncheckedCreateWithoutMealPlanDishesInput>
    connectOrCreate?: UserMealPlanCreateOrConnectWithoutMealPlanDishesInput
    connect?: UserMealPlanWhereUniqueInput
  }

  export type DishCreateNestedOneWithoutMealPlanDishesInput = {
    create?: XOR<DishCreateWithoutMealPlanDishesInput, DishUncheckedCreateWithoutMealPlanDishesInput>
    connectOrCreate?: DishCreateOrConnectWithoutMealPlanDishesInput
    connect?: DishWhereUniqueInput
  }

  export type UserMealPlanUpdateOneRequiredWithoutMealPlanDishesNestedInput = {
    create?: XOR<UserMealPlanCreateWithoutMealPlanDishesInput, UserMealPlanUncheckedCreateWithoutMealPlanDishesInput>
    connectOrCreate?: UserMealPlanCreateOrConnectWithoutMealPlanDishesInput
    upsert?: UserMealPlanUpsertWithoutMealPlanDishesInput
    connect?: UserMealPlanWhereUniqueInput
    update?: XOR<XOR<UserMealPlanUpdateToOneWithWhereWithoutMealPlanDishesInput, UserMealPlanUpdateWithoutMealPlanDishesInput>, UserMealPlanUncheckedUpdateWithoutMealPlanDishesInput>
  }

  export type DishUpdateOneRequiredWithoutMealPlanDishesNestedInput = {
    create?: XOR<DishCreateWithoutMealPlanDishesInput, DishUncheckedCreateWithoutMealPlanDishesInput>
    connectOrCreate?: DishCreateOrConnectWithoutMealPlanDishesInput
    upsert?: DishUpsertWithoutMealPlanDishesInput
    connect?: DishWhereUniqueInput
    update?: XOR<XOR<DishUpdateToOneWithWhereWithoutMealPlanDishesInput, DishUpdateWithoutMealPlanDishesInput>, DishUncheckedUpdateWithoutMealPlanDishesInput>
  }

  export type UserCreateNestedOneWithoutCalorieLogsInput = {
    create?: XOR<UserCreateWithoutCalorieLogsInput, UserUncheckedCreateWithoutCalorieLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCalorieLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCalorieLogsNestedInput = {
    create?: XOR<UserCreateWithoutCalorieLogsInput, UserUncheckedCreateWithoutCalorieLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCalorieLogsInput
    upsert?: UserUpsertWithoutCalorieLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCalorieLogsInput, UserUpdateWithoutCalorieLogsInput>, UserUncheckedUpdateWithoutCalorieLogsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type UserLocationCreateWithoutUserInput = {
    name: string
    latitude: number
    longitude: number
  }

  export type UserLocationUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    latitude: number
    longitude: number
  }

  export type UserLocationCreateOrConnectWithoutUserInput = {
    where: UserLocationWhereUniqueInput
    create: XOR<UserLocationCreateWithoutUserInput, UserLocationUncheckedCreateWithoutUserInput>
  }

  export type UserLocationCreateManyUserInputEnvelope = {
    data: UserLocationCreateManyUserInput | UserLocationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserDietaryCreateWithoutUserInput = {
    dietary: DietaryRestrictionCreateNestedOneWithoutUserDietariesInput
  }

  export type UserDietaryUncheckedCreateWithoutUserInput = {
    dietaryId: number
  }

  export type UserDietaryCreateOrConnectWithoutUserInput = {
    where: UserDietaryWhereUniqueInput
    create: XOR<UserDietaryCreateWithoutUserInput, UserDietaryUncheckedCreateWithoutUserInput>
  }

  export type UserDietaryCreateManyUserInputEnvelope = {
    data: UserDietaryCreateManyUserInput | UserDietaryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserMealPlanCreateWithoutUserInput = {
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    mealPlanDishes?: MealPlanDishCreateNestedManyWithoutMealPlanInput
  }

  export type UserMealPlanUncheckedCreateWithoutUserInput = {
    id?: number
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    mealPlanDishes?: MealPlanDishUncheckedCreateNestedManyWithoutMealPlanInput
  }

  export type UserMealPlanCreateOrConnectWithoutUserInput = {
    where: UserMealPlanWhereUniqueInput
    create: XOR<UserMealPlanCreateWithoutUserInput, UserMealPlanUncheckedCreateWithoutUserInput>
  }

  export type UserMealPlanCreateManyUserInputEnvelope = {
    data: UserMealPlanCreateManyUserInput | UserMealPlanCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserCalorieLogCreateWithoutUserInput = {
    date: Date | string
    calories: number
    createdAt?: Date | string
  }

  export type UserCalorieLogUncheckedCreateWithoutUserInput = {
    id?: number
    date: Date | string
    calories: number
    createdAt?: Date | string
  }

  export type UserCalorieLogCreateOrConnectWithoutUserInput = {
    where: UserCalorieLogWhereUniqueInput
    create: XOR<UserCalorieLogCreateWithoutUserInput, UserCalorieLogUncheckedCreateWithoutUserInput>
  }

  export type UserCalorieLogCreateManyUserInputEnvelope = {
    data: UserCalorieLogCreateManyUserInput | UserCalorieLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RestaurantReviewCreateWithoutUserInput = {
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    restaurant: RestaurantCreateNestedOneWithoutRestaurantReviewsInput
  }

  export type RestaurantReviewUncheckedCreateWithoutUserInput = {
    id?: number
    restaurantId: number
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RestaurantReviewCreateOrConnectWithoutUserInput = {
    where: RestaurantReviewWhereUniqueInput
    create: XOR<RestaurantReviewCreateWithoutUserInput, RestaurantReviewUncheckedCreateWithoutUserInput>
  }

  export type RestaurantReviewCreateManyUserInputEnvelope = {
    data: RestaurantReviewCreateManyUserInput | RestaurantReviewCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserLocationUpsertWithWhereUniqueWithoutUserInput = {
    where: UserLocationWhereUniqueInput
    update: XOR<UserLocationUpdateWithoutUserInput, UserLocationUncheckedUpdateWithoutUserInput>
    create: XOR<UserLocationCreateWithoutUserInput, UserLocationUncheckedCreateWithoutUserInput>
  }

  export type UserLocationUpdateWithWhereUniqueWithoutUserInput = {
    where: UserLocationWhereUniqueInput
    data: XOR<UserLocationUpdateWithoutUserInput, UserLocationUncheckedUpdateWithoutUserInput>
  }

  export type UserLocationUpdateManyWithWhereWithoutUserInput = {
    where: UserLocationScalarWhereInput
    data: XOR<UserLocationUpdateManyMutationInput, UserLocationUncheckedUpdateManyWithoutUserInput>
  }

  export type UserLocationScalarWhereInput = {
    AND?: UserLocationScalarWhereInput | UserLocationScalarWhereInput[]
    OR?: UserLocationScalarWhereInput[]
    NOT?: UserLocationScalarWhereInput | UserLocationScalarWhereInput[]
    id?: IntFilter<"UserLocation"> | number
    userId?: IntFilter<"UserLocation"> | number
    name?: StringFilter<"UserLocation"> | string
    latitude?: FloatFilter<"UserLocation"> | number
    longitude?: FloatFilter<"UserLocation"> | number
  }

  export type UserDietaryUpsertWithWhereUniqueWithoutUserInput = {
    where: UserDietaryWhereUniqueInput
    update: XOR<UserDietaryUpdateWithoutUserInput, UserDietaryUncheckedUpdateWithoutUserInput>
    create: XOR<UserDietaryCreateWithoutUserInput, UserDietaryUncheckedCreateWithoutUserInput>
  }

  export type UserDietaryUpdateWithWhereUniqueWithoutUserInput = {
    where: UserDietaryWhereUniqueInput
    data: XOR<UserDietaryUpdateWithoutUserInput, UserDietaryUncheckedUpdateWithoutUserInput>
  }

  export type UserDietaryUpdateManyWithWhereWithoutUserInput = {
    where: UserDietaryScalarWhereInput
    data: XOR<UserDietaryUpdateManyMutationInput, UserDietaryUncheckedUpdateManyWithoutUserInput>
  }

  export type UserDietaryScalarWhereInput = {
    AND?: UserDietaryScalarWhereInput | UserDietaryScalarWhereInput[]
    OR?: UserDietaryScalarWhereInput[]
    NOT?: UserDietaryScalarWhereInput | UserDietaryScalarWhereInput[]
    userId?: IntFilter<"UserDietary"> | number
    dietaryId?: IntFilter<"UserDietary"> | number
  }

  export type UserMealPlanUpsertWithWhereUniqueWithoutUserInput = {
    where: UserMealPlanWhereUniqueInput
    update: XOR<UserMealPlanUpdateWithoutUserInput, UserMealPlanUncheckedUpdateWithoutUserInput>
    create: XOR<UserMealPlanCreateWithoutUserInput, UserMealPlanUncheckedCreateWithoutUserInput>
  }

  export type UserMealPlanUpdateWithWhereUniqueWithoutUserInput = {
    where: UserMealPlanWhereUniqueInput
    data: XOR<UserMealPlanUpdateWithoutUserInput, UserMealPlanUncheckedUpdateWithoutUserInput>
  }

  export type UserMealPlanUpdateManyWithWhereWithoutUserInput = {
    where: UserMealPlanScalarWhereInput
    data: XOR<UserMealPlanUpdateManyMutationInput, UserMealPlanUncheckedUpdateManyWithoutUserInput>
  }

  export type UserMealPlanScalarWhereInput = {
    AND?: UserMealPlanScalarWhereInput | UserMealPlanScalarWhereInput[]
    OR?: UserMealPlanScalarWhereInput[]
    NOT?: UserMealPlanScalarWhereInput | UserMealPlanScalarWhereInput[]
    id?: IntFilter<"UserMealPlan"> | number
    userId?: IntFilter<"UserMealPlan"> | number
    date?: DateTimeFilter<"UserMealPlan"> | Date | string
    createdAt?: DateTimeFilter<"UserMealPlan"> | Date | string
    updatedAt?: DateTimeFilter<"UserMealPlan"> | Date | string
  }

  export type UserCalorieLogUpsertWithWhereUniqueWithoutUserInput = {
    where: UserCalorieLogWhereUniqueInput
    update: XOR<UserCalorieLogUpdateWithoutUserInput, UserCalorieLogUncheckedUpdateWithoutUserInput>
    create: XOR<UserCalorieLogCreateWithoutUserInput, UserCalorieLogUncheckedCreateWithoutUserInput>
  }

  export type UserCalorieLogUpdateWithWhereUniqueWithoutUserInput = {
    where: UserCalorieLogWhereUniqueInput
    data: XOR<UserCalorieLogUpdateWithoutUserInput, UserCalorieLogUncheckedUpdateWithoutUserInput>
  }

  export type UserCalorieLogUpdateManyWithWhereWithoutUserInput = {
    where: UserCalorieLogScalarWhereInput
    data: XOR<UserCalorieLogUpdateManyMutationInput, UserCalorieLogUncheckedUpdateManyWithoutUserInput>
  }

  export type UserCalorieLogScalarWhereInput = {
    AND?: UserCalorieLogScalarWhereInput | UserCalorieLogScalarWhereInput[]
    OR?: UserCalorieLogScalarWhereInput[]
    NOT?: UserCalorieLogScalarWhereInput | UserCalorieLogScalarWhereInput[]
    id?: IntFilter<"UserCalorieLog"> | number
    userId?: IntFilter<"UserCalorieLog"> | number
    date?: DateTimeFilter<"UserCalorieLog"> | Date | string
    calories?: IntFilter<"UserCalorieLog"> | number
    createdAt?: DateTimeFilter<"UserCalorieLog"> | Date | string
  }

  export type RestaurantReviewUpsertWithWhereUniqueWithoutUserInput = {
    where: RestaurantReviewWhereUniqueInput
    update: XOR<RestaurantReviewUpdateWithoutUserInput, RestaurantReviewUncheckedUpdateWithoutUserInput>
    create: XOR<RestaurantReviewCreateWithoutUserInput, RestaurantReviewUncheckedCreateWithoutUserInput>
  }

  export type RestaurantReviewUpdateWithWhereUniqueWithoutUserInput = {
    where: RestaurantReviewWhereUniqueInput
    data: XOR<RestaurantReviewUpdateWithoutUserInput, RestaurantReviewUncheckedUpdateWithoutUserInput>
  }

  export type RestaurantReviewUpdateManyWithWhereWithoutUserInput = {
    where: RestaurantReviewScalarWhereInput
    data: XOR<RestaurantReviewUpdateManyMutationInput, RestaurantReviewUncheckedUpdateManyWithoutUserInput>
  }

  export type RestaurantReviewScalarWhereInput = {
    AND?: RestaurantReviewScalarWhereInput | RestaurantReviewScalarWhereInput[]
    OR?: RestaurantReviewScalarWhereInput[]
    NOT?: RestaurantReviewScalarWhereInput | RestaurantReviewScalarWhereInput[]
    id?: IntFilter<"RestaurantReview"> | number
    userId?: IntFilter<"RestaurantReview"> | number
    restaurantId?: IntFilter<"RestaurantReview"> | number
    rating?: IntFilter<"RestaurantReview"> | number
    comment?: StringNullableFilter<"RestaurantReview"> | string | null
    createdAt?: DateTimeFilter<"RestaurantReview"> | Date | string
    updatedAt?: DateTimeFilter<"RestaurantReview"> | Date | string
  }

  export type UserCreateWithoutLocationsInput = {
    name: string
    email: string
    passwordHash?: string | null
    provider: string
    providerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userDietaries?: UserDietaryCreateNestedManyWithoutUserInput
    mealPlans?: UserMealPlanCreateNestedManyWithoutUserInput
    calorieLogs?: UserCalorieLogCreateNestedManyWithoutUserInput
    restaurantReviews?: RestaurantReviewCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLocationsInput = {
    id?: number
    name: string
    email: string
    passwordHash?: string | null
    provider: string
    providerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userDietaries?: UserDietaryUncheckedCreateNestedManyWithoutUserInput
    mealPlans?: UserMealPlanUncheckedCreateNestedManyWithoutUserInput
    calorieLogs?: UserCalorieLogUncheckedCreateNestedManyWithoutUserInput
    restaurantReviews?: RestaurantReviewUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLocationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLocationsInput, UserUncheckedCreateWithoutLocationsInput>
  }

  export type UserUpsertWithoutLocationsInput = {
    update: XOR<UserUpdateWithoutLocationsInput, UserUncheckedUpdateWithoutLocationsInput>
    create: XOR<UserCreateWithoutLocationsInput, UserUncheckedCreateWithoutLocationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLocationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLocationsInput, UserUncheckedUpdateWithoutLocationsInput>
  }

  export type UserUpdateWithoutLocationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userDietaries?: UserDietaryUpdateManyWithoutUserNestedInput
    mealPlans?: UserMealPlanUpdateManyWithoutUserNestedInput
    calorieLogs?: UserCalorieLogUpdateManyWithoutUserNestedInput
    restaurantReviews?: RestaurantReviewUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLocationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userDietaries?: UserDietaryUncheckedUpdateManyWithoutUserNestedInput
    mealPlans?: UserMealPlanUncheckedUpdateManyWithoutUserNestedInput
    calorieLogs?: UserCalorieLogUncheckedUpdateManyWithoutUserNestedInput
    restaurantReviews?: RestaurantReviewUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserDietaryCreateWithoutDietaryInput = {
    user: UserCreateNestedOneWithoutUserDietariesInput
  }

  export type UserDietaryUncheckedCreateWithoutDietaryInput = {
    userId: number
  }

  export type UserDietaryCreateOrConnectWithoutDietaryInput = {
    where: UserDietaryWhereUniqueInput
    create: XOR<UserDietaryCreateWithoutDietaryInput, UserDietaryUncheckedCreateWithoutDietaryInput>
  }

  export type UserDietaryCreateManyDietaryInputEnvelope = {
    data: UserDietaryCreateManyDietaryInput | UserDietaryCreateManyDietaryInput[]
    skipDuplicates?: boolean
  }

  export type DishDietaryCreateWithoutDietaryInput = {
    dish: DishCreateNestedOneWithoutDishDietariesInput
  }

  export type DishDietaryUncheckedCreateWithoutDietaryInput = {
    dishId: number
  }

  export type DishDietaryCreateOrConnectWithoutDietaryInput = {
    where: DishDietaryWhereUniqueInput
    create: XOR<DishDietaryCreateWithoutDietaryInput, DishDietaryUncheckedCreateWithoutDietaryInput>
  }

  export type DishDietaryCreateManyDietaryInputEnvelope = {
    data: DishDietaryCreateManyDietaryInput | DishDietaryCreateManyDietaryInput[]
    skipDuplicates?: boolean
  }

  export type UserDietaryUpsertWithWhereUniqueWithoutDietaryInput = {
    where: UserDietaryWhereUniqueInput
    update: XOR<UserDietaryUpdateWithoutDietaryInput, UserDietaryUncheckedUpdateWithoutDietaryInput>
    create: XOR<UserDietaryCreateWithoutDietaryInput, UserDietaryUncheckedCreateWithoutDietaryInput>
  }

  export type UserDietaryUpdateWithWhereUniqueWithoutDietaryInput = {
    where: UserDietaryWhereUniqueInput
    data: XOR<UserDietaryUpdateWithoutDietaryInput, UserDietaryUncheckedUpdateWithoutDietaryInput>
  }

  export type UserDietaryUpdateManyWithWhereWithoutDietaryInput = {
    where: UserDietaryScalarWhereInput
    data: XOR<UserDietaryUpdateManyMutationInput, UserDietaryUncheckedUpdateManyWithoutDietaryInput>
  }

  export type DishDietaryUpsertWithWhereUniqueWithoutDietaryInput = {
    where: DishDietaryWhereUniqueInput
    update: XOR<DishDietaryUpdateWithoutDietaryInput, DishDietaryUncheckedUpdateWithoutDietaryInput>
    create: XOR<DishDietaryCreateWithoutDietaryInput, DishDietaryUncheckedCreateWithoutDietaryInput>
  }

  export type DishDietaryUpdateWithWhereUniqueWithoutDietaryInput = {
    where: DishDietaryWhereUniqueInput
    data: XOR<DishDietaryUpdateWithoutDietaryInput, DishDietaryUncheckedUpdateWithoutDietaryInput>
  }

  export type DishDietaryUpdateManyWithWhereWithoutDietaryInput = {
    where: DishDietaryScalarWhereInput
    data: XOR<DishDietaryUpdateManyMutationInput, DishDietaryUncheckedUpdateManyWithoutDietaryInput>
  }

  export type DishDietaryScalarWhereInput = {
    AND?: DishDietaryScalarWhereInput | DishDietaryScalarWhereInput[]
    OR?: DishDietaryScalarWhereInput[]
    NOT?: DishDietaryScalarWhereInput | DishDietaryScalarWhereInput[]
    dishId?: IntFilter<"DishDietary"> | number
    dietaryId?: IntFilter<"DishDietary"> | number
  }

  export type UserCreateWithoutUserDietariesInput = {
    name: string
    email: string
    passwordHash?: string | null
    provider: string
    providerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: UserLocationCreateNestedManyWithoutUserInput
    mealPlans?: UserMealPlanCreateNestedManyWithoutUserInput
    calorieLogs?: UserCalorieLogCreateNestedManyWithoutUserInput
    restaurantReviews?: RestaurantReviewCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUserDietariesInput = {
    id?: number
    name: string
    email: string
    passwordHash?: string | null
    provider: string
    providerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: UserLocationUncheckedCreateNestedManyWithoutUserInput
    mealPlans?: UserMealPlanUncheckedCreateNestedManyWithoutUserInput
    calorieLogs?: UserCalorieLogUncheckedCreateNestedManyWithoutUserInput
    restaurantReviews?: RestaurantReviewUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUserDietariesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUserDietariesInput, UserUncheckedCreateWithoutUserDietariesInput>
  }

  export type DietaryRestrictionCreateWithoutUserDietariesInput = {
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dishDietaries?: DishDietaryCreateNestedManyWithoutDietaryInput
  }

  export type DietaryRestrictionUncheckedCreateWithoutUserDietariesInput = {
    id?: number
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dishDietaries?: DishDietaryUncheckedCreateNestedManyWithoutDietaryInput
  }

  export type DietaryRestrictionCreateOrConnectWithoutUserDietariesInput = {
    where: DietaryRestrictionWhereUniqueInput
    create: XOR<DietaryRestrictionCreateWithoutUserDietariesInput, DietaryRestrictionUncheckedCreateWithoutUserDietariesInput>
  }

  export type UserUpsertWithoutUserDietariesInput = {
    update: XOR<UserUpdateWithoutUserDietariesInput, UserUncheckedUpdateWithoutUserDietariesInput>
    create: XOR<UserCreateWithoutUserDietariesInput, UserUncheckedCreateWithoutUserDietariesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUserDietariesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUserDietariesInput, UserUncheckedUpdateWithoutUserDietariesInput>
  }

  export type UserUpdateWithoutUserDietariesInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: UserLocationUpdateManyWithoutUserNestedInput
    mealPlans?: UserMealPlanUpdateManyWithoutUserNestedInput
    calorieLogs?: UserCalorieLogUpdateManyWithoutUserNestedInput
    restaurantReviews?: RestaurantReviewUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUserDietariesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: UserLocationUncheckedUpdateManyWithoutUserNestedInput
    mealPlans?: UserMealPlanUncheckedUpdateManyWithoutUserNestedInput
    calorieLogs?: UserCalorieLogUncheckedUpdateManyWithoutUserNestedInput
    restaurantReviews?: RestaurantReviewUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DietaryRestrictionUpsertWithoutUserDietariesInput = {
    update: XOR<DietaryRestrictionUpdateWithoutUserDietariesInput, DietaryRestrictionUncheckedUpdateWithoutUserDietariesInput>
    create: XOR<DietaryRestrictionCreateWithoutUserDietariesInput, DietaryRestrictionUncheckedCreateWithoutUserDietariesInput>
    where?: DietaryRestrictionWhereInput
  }

  export type DietaryRestrictionUpdateToOneWithWhereWithoutUserDietariesInput = {
    where?: DietaryRestrictionWhereInput
    data: XOR<DietaryRestrictionUpdateWithoutUserDietariesInput, DietaryRestrictionUncheckedUpdateWithoutUserDietariesInput>
  }

  export type DietaryRestrictionUpdateWithoutUserDietariesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dishDietaries?: DishDietaryUpdateManyWithoutDietaryNestedInput
  }

  export type DietaryRestrictionUncheckedUpdateWithoutUserDietariesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dishDietaries?: DishDietaryUncheckedUpdateManyWithoutDietaryNestedInput
  }

  export type DishCreateWithoutRestaurantInput = {
    name: string
    description?: string | null
    calories?: number | null
    price?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cuisine?: CuisineCreateNestedOneWithoutDishesInput
    dishDietaries?: DishDietaryCreateNestedManyWithoutDishInput
    mealPlanDishes?: MealPlanDishCreateNestedManyWithoutDishInput
  }

  export type DishUncheckedCreateWithoutRestaurantInput = {
    id?: number
    name: string
    description?: string | null
    calories?: number | null
    price?: number | null
    cuisineId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dishDietaries?: DishDietaryUncheckedCreateNestedManyWithoutDishInput
    mealPlanDishes?: MealPlanDishUncheckedCreateNestedManyWithoutDishInput
  }

  export type DishCreateOrConnectWithoutRestaurantInput = {
    where: DishWhereUniqueInput
    create: XOR<DishCreateWithoutRestaurantInput, DishUncheckedCreateWithoutRestaurantInput>
  }

  export type DishCreateManyRestaurantInputEnvelope = {
    data: DishCreateManyRestaurantInput | DishCreateManyRestaurantInput[]
    skipDuplicates?: boolean
  }

  export type RestaurantCuisineCreateWithoutRestaurantInput = {
    cuisine: CuisineCreateNestedOneWithoutRestaurantCuisinesInput
  }

  export type RestaurantCuisineUncheckedCreateWithoutRestaurantInput = {
    cuisineId: number
  }

  export type RestaurantCuisineCreateOrConnectWithoutRestaurantInput = {
    where: RestaurantCuisineWhereUniqueInput
    create: XOR<RestaurantCuisineCreateWithoutRestaurantInput, RestaurantCuisineUncheckedCreateWithoutRestaurantInput>
  }

  export type RestaurantCuisineCreateManyRestaurantInputEnvelope = {
    data: RestaurantCuisineCreateManyRestaurantInput | RestaurantCuisineCreateManyRestaurantInput[]
    skipDuplicates?: boolean
  }

  export type RestaurantReviewCreateWithoutRestaurantInput = {
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutRestaurantReviewsInput
  }

  export type RestaurantReviewUncheckedCreateWithoutRestaurantInput = {
    id?: number
    userId: number
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RestaurantReviewCreateOrConnectWithoutRestaurantInput = {
    where: RestaurantReviewWhereUniqueInput
    create: XOR<RestaurantReviewCreateWithoutRestaurantInput, RestaurantReviewUncheckedCreateWithoutRestaurantInput>
  }

  export type RestaurantReviewCreateManyRestaurantInputEnvelope = {
    data: RestaurantReviewCreateManyRestaurantInput | RestaurantReviewCreateManyRestaurantInput[]
    skipDuplicates?: boolean
  }

  export type DishUpsertWithWhereUniqueWithoutRestaurantInput = {
    where: DishWhereUniqueInput
    update: XOR<DishUpdateWithoutRestaurantInput, DishUncheckedUpdateWithoutRestaurantInput>
    create: XOR<DishCreateWithoutRestaurantInput, DishUncheckedCreateWithoutRestaurantInput>
  }

  export type DishUpdateWithWhereUniqueWithoutRestaurantInput = {
    where: DishWhereUniqueInput
    data: XOR<DishUpdateWithoutRestaurantInput, DishUncheckedUpdateWithoutRestaurantInput>
  }

  export type DishUpdateManyWithWhereWithoutRestaurantInput = {
    where: DishScalarWhereInput
    data: XOR<DishUpdateManyMutationInput, DishUncheckedUpdateManyWithoutRestaurantInput>
  }

  export type DishScalarWhereInput = {
    AND?: DishScalarWhereInput | DishScalarWhereInput[]
    OR?: DishScalarWhereInput[]
    NOT?: DishScalarWhereInput | DishScalarWhereInput[]
    id?: IntFilter<"Dish"> | number
    name?: StringFilter<"Dish"> | string
    description?: StringNullableFilter<"Dish"> | string | null
    calories?: IntNullableFilter<"Dish"> | number | null
    price?: FloatNullableFilter<"Dish"> | number | null
    restaurantId?: IntFilter<"Dish"> | number
    cuisineId?: IntNullableFilter<"Dish"> | number | null
    createdAt?: DateTimeFilter<"Dish"> | Date | string
    updatedAt?: DateTimeFilter<"Dish"> | Date | string
  }

  export type RestaurantCuisineUpsertWithWhereUniqueWithoutRestaurantInput = {
    where: RestaurantCuisineWhereUniqueInput
    update: XOR<RestaurantCuisineUpdateWithoutRestaurantInput, RestaurantCuisineUncheckedUpdateWithoutRestaurantInput>
    create: XOR<RestaurantCuisineCreateWithoutRestaurantInput, RestaurantCuisineUncheckedCreateWithoutRestaurantInput>
  }

  export type RestaurantCuisineUpdateWithWhereUniqueWithoutRestaurantInput = {
    where: RestaurantCuisineWhereUniqueInput
    data: XOR<RestaurantCuisineUpdateWithoutRestaurantInput, RestaurantCuisineUncheckedUpdateWithoutRestaurantInput>
  }

  export type RestaurantCuisineUpdateManyWithWhereWithoutRestaurantInput = {
    where: RestaurantCuisineScalarWhereInput
    data: XOR<RestaurantCuisineUpdateManyMutationInput, RestaurantCuisineUncheckedUpdateManyWithoutRestaurantInput>
  }

  export type RestaurantCuisineScalarWhereInput = {
    AND?: RestaurantCuisineScalarWhereInput | RestaurantCuisineScalarWhereInput[]
    OR?: RestaurantCuisineScalarWhereInput[]
    NOT?: RestaurantCuisineScalarWhereInput | RestaurantCuisineScalarWhereInput[]
    restaurantId?: IntFilter<"RestaurantCuisine"> | number
    cuisineId?: IntFilter<"RestaurantCuisine"> | number
  }

  export type RestaurantReviewUpsertWithWhereUniqueWithoutRestaurantInput = {
    where: RestaurantReviewWhereUniqueInput
    update: XOR<RestaurantReviewUpdateWithoutRestaurantInput, RestaurantReviewUncheckedUpdateWithoutRestaurantInput>
    create: XOR<RestaurantReviewCreateWithoutRestaurantInput, RestaurantReviewUncheckedCreateWithoutRestaurantInput>
  }

  export type RestaurantReviewUpdateWithWhereUniqueWithoutRestaurantInput = {
    where: RestaurantReviewWhereUniqueInput
    data: XOR<RestaurantReviewUpdateWithoutRestaurantInput, RestaurantReviewUncheckedUpdateWithoutRestaurantInput>
  }

  export type RestaurantReviewUpdateManyWithWhereWithoutRestaurantInput = {
    where: RestaurantReviewScalarWhereInput
    data: XOR<RestaurantReviewUpdateManyMutationInput, RestaurantReviewUncheckedUpdateManyWithoutRestaurantInput>
  }

  export type UserCreateWithoutRestaurantReviewsInput = {
    name: string
    email: string
    passwordHash?: string | null
    provider: string
    providerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: UserLocationCreateNestedManyWithoutUserInput
    userDietaries?: UserDietaryCreateNestedManyWithoutUserInput
    mealPlans?: UserMealPlanCreateNestedManyWithoutUserInput
    calorieLogs?: UserCalorieLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRestaurantReviewsInput = {
    id?: number
    name: string
    email: string
    passwordHash?: string | null
    provider: string
    providerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: UserLocationUncheckedCreateNestedManyWithoutUserInput
    userDietaries?: UserDietaryUncheckedCreateNestedManyWithoutUserInput
    mealPlans?: UserMealPlanUncheckedCreateNestedManyWithoutUserInput
    calorieLogs?: UserCalorieLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRestaurantReviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRestaurantReviewsInput, UserUncheckedCreateWithoutRestaurantReviewsInput>
  }

  export type RestaurantCreateWithoutRestaurantReviewsInput = {
    name: string
    address: string
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dishes?: DishCreateNestedManyWithoutRestaurantInput
    restaurantCuisines?: RestaurantCuisineCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantUncheckedCreateWithoutRestaurantReviewsInput = {
    id?: number
    name: string
    address: string
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dishes?: DishUncheckedCreateNestedManyWithoutRestaurantInput
    restaurantCuisines?: RestaurantCuisineUncheckedCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantCreateOrConnectWithoutRestaurantReviewsInput = {
    where: RestaurantWhereUniqueInput
    create: XOR<RestaurantCreateWithoutRestaurantReviewsInput, RestaurantUncheckedCreateWithoutRestaurantReviewsInput>
  }

  export type UserUpsertWithoutRestaurantReviewsInput = {
    update: XOR<UserUpdateWithoutRestaurantReviewsInput, UserUncheckedUpdateWithoutRestaurantReviewsInput>
    create: XOR<UserCreateWithoutRestaurantReviewsInput, UserUncheckedCreateWithoutRestaurantReviewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRestaurantReviewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRestaurantReviewsInput, UserUncheckedUpdateWithoutRestaurantReviewsInput>
  }

  export type UserUpdateWithoutRestaurantReviewsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: UserLocationUpdateManyWithoutUserNestedInput
    userDietaries?: UserDietaryUpdateManyWithoutUserNestedInput
    mealPlans?: UserMealPlanUpdateManyWithoutUserNestedInput
    calorieLogs?: UserCalorieLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRestaurantReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: UserLocationUncheckedUpdateManyWithoutUserNestedInput
    userDietaries?: UserDietaryUncheckedUpdateManyWithoutUserNestedInput
    mealPlans?: UserMealPlanUncheckedUpdateManyWithoutUserNestedInput
    calorieLogs?: UserCalorieLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RestaurantUpsertWithoutRestaurantReviewsInput = {
    update: XOR<RestaurantUpdateWithoutRestaurantReviewsInput, RestaurantUncheckedUpdateWithoutRestaurantReviewsInput>
    create: XOR<RestaurantCreateWithoutRestaurantReviewsInput, RestaurantUncheckedCreateWithoutRestaurantReviewsInput>
    where?: RestaurantWhereInput
  }

  export type RestaurantUpdateToOneWithWhereWithoutRestaurantReviewsInput = {
    where?: RestaurantWhereInput
    data: XOR<RestaurantUpdateWithoutRestaurantReviewsInput, RestaurantUncheckedUpdateWithoutRestaurantReviewsInput>
  }

  export type RestaurantUpdateWithoutRestaurantReviewsInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dishes?: DishUpdateManyWithoutRestaurantNestedInput
    restaurantCuisines?: RestaurantCuisineUpdateManyWithoutRestaurantNestedInput
  }

  export type RestaurantUncheckedUpdateWithoutRestaurantReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dishes?: DishUncheckedUpdateManyWithoutRestaurantNestedInput
    restaurantCuisines?: RestaurantCuisineUncheckedUpdateManyWithoutRestaurantNestedInput
  }

  export type DishCreateWithoutCuisineInput = {
    name: string
    description?: string | null
    calories?: number | null
    price?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    restaurant: RestaurantCreateNestedOneWithoutDishesInput
    dishDietaries?: DishDietaryCreateNestedManyWithoutDishInput
    mealPlanDishes?: MealPlanDishCreateNestedManyWithoutDishInput
  }

  export type DishUncheckedCreateWithoutCuisineInput = {
    id?: number
    name: string
    description?: string | null
    calories?: number | null
    price?: number | null
    restaurantId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    dishDietaries?: DishDietaryUncheckedCreateNestedManyWithoutDishInput
    mealPlanDishes?: MealPlanDishUncheckedCreateNestedManyWithoutDishInput
  }

  export type DishCreateOrConnectWithoutCuisineInput = {
    where: DishWhereUniqueInput
    create: XOR<DishCreateWithoutCuisineInput, DishUncheckedCreateWithoutCuisineInput>
  }

  export type DishCreateManyCuisineInputEnvelope = {
    data: DishCreateManyCuisineInput | DishCreateManyCuisineInput[]
    skipDuplicates?: boolean
  }

  export type RestaurantCuisineCreateWithoutCuisineInput = {
    restaurant: RestaurantCreateNestedOneWithoutRestaurantCuisinesInput
  }

  export type RestaurantCuisineUncheckedCreateWithoutCuisineInput = {
    restaurantId: number
  }

  export type RestaurantCuisineCreateOrConnectWithoutCuisineInput = {
    where: RestaurantCuisineWhereUniqueInput
    create: XOR<RestaurantCuisineCreateWithoutCuisineInput, RestaurantCuisineUncheckedCreateWithoutCuisineInput>
  }

  export type RestaurantCuisineCreateManyCuisineInputEnvelope = {
    data: RestaurantCuisineCreateManyCuisineInput | RestaurantCuisineCreateManyCuisineInput[]
    skipDuplicates?: boolean
  }

  export type DishUpsertWithWhereUniqueWithoutCuisineInput = {
    where: DishWhereUniqueInput
    update: XOR<DishUpdateWithoutCuisineInput, DishUncheckedUpdateWithoutCuisineInput>
    create: XOR<DishCreateWithoutCuisineInput, DishUncheckedCreateWithoutCuisineInput>
  }

  export type DishUpdateWithWhereUniqueWithoutCuisineInput = {
    where: DishWhereUniqueInput
    data: XOR<DishUpdateWithoutCuisineInput, DishUncheckedUpdateWithoutCuisineInput>
  }

  export type DishUpdateManyWithWhereWithoutCuisineInput = {
    where: DishScalarWhereInput
    data: XOR<DishUpdateManyMutationInput, DishUncheckedUpdateManyWithoutCuisineInput>
  }

  export type RestaurantCuisineUpsertWithWhereUniqueWithoutCuisineInput = {
    where: RestaurantCuisineWhereUniqueInput
    update: XOR<RestaurantCuisineUpdateWithoutCuisineInput, RestaurantCuisineUncheckedUpdateWithoutCuisineInput>
    create: XOR<RestaurantCuisineCreateWithoutCuisineInput, RestaurantCuisineUncheckedCreateWithoutCuisineInput>
  }

  export type RestaurantCuisineUpdateWithWhereUniqueWithoutCuisineInput = {
    where: RestaurantCuisineWhereUniqueInput
    data: XOR<RestaurantCuisineUpdateWithoutCuisineInput, RestaurantCuisineUncheckedUpdateWithoutCuisineInput>
  }

  export type RestaurantCuisineUpdateManyWithWhereWithoutCuisineInput = {
    where: RestaurantCuisineScalarWhereInput
    data: XOR<RestaurantCuisineUpdateManyMutationInput, RestaurantCuisineUncheckedUpdateManyWithoutCuisineInput>
  }

  export type RestaurantCreateWithoutRestaurantCuisinesInput = {
    name: string
    address: string
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dishes?: DishCreateNestedManyWithoutRestaurantInput
    restaurantReviews?: RestaurantReviewCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantUncheckedCreateWithoutRestaurantCuisinesInput = {
    id?: number
    name: string
    address: string
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dishes?: DishUncheckedCreateNestedManyWithoutRestaurantInput
    restaurantReviews?: RestaurantReviewUncheckedCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantCreateOrConnectWithoutRestaurantCuisinesInput = {
    where: RestaurantWhereUniqueInput
    create: XOR<RestaurantCreateWithoutRestaurantCuisinesInput, RestaurantUncheckedCreateWithoutRestaurantCuisinesInput>
  }

  export type CuisineCreateWithoutRestaurantCuisinesInput = {
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dishes?: DishCreateNestedManyWithoutCuisineInput
  }

  export type CuisineUncheckedCreateWithoutRestaurantCuisinesInput = {
    id?: number
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dishes?: DishUncheckedCreateNestedManyWithoutCuisineInput
  }

  export type CuisineCreateOrConnectWithoutRestaurantCuisinesInput = {
    where: CuisineWhereUniqueInput
    create: XOR<CuisineCreateWithoutRestaurantCuisinesInput, CuisineUncheckedCreateWithoutRestaurantCuisinesInput>
  }

  export type RestaurantUpsertWithoutRestaurantCuisinesInput = {
    update: XOR<RestaurantUpdateWithoutRestaurantCuisinesInput, RestaurantUncheckedUpdateWithoutRestaurantCuisinesInput>
    create: XOR<RestaurantCreateWithoutRestaurantCuisinesInput, RestaurantUncheckedCreateWithoutRestaurantCuisinesInput>
    where?: RestaurantWhereInput
  }

  export type RestaurantUpdateToOneWithWhereWithoutRestaurantCuisinesInput = {
    where?: RestaurantWhereInput
    data: XOR<RestaurantUpdateWithoutRestaurantCuisinesInput, RestaurantUncheckedUpdateWithoutRestaurantCuisinesInput>
  }

  export type RestaurantUpdateWithoutRestaurantCuisinesInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dishes?: DishUpdateManyWithoutRestaurantNestedInput
    restaurantReviews?: RestaurantReviewUpdateManyWithoutRestaurantNestedInput
  }

  export type RestaurantUncheckedUpdateWithoutRestaurantCuisinesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dishes?: DishUncheckedUpdateManyWithoutRestaurantNestedInput
    restaurantReviews?: RestaurantReviewUncheckedUpdateManyWithoutRestaurantNestedInput
  }

  export type CuisineUpsertWithoutRestaurantCuisinesInput = {
    update: XOR<CuisineUpdateWithoutRestaurantCuisinesInput, CuisineUncheckedUpdateWithoutRestaurantCuisinesInput>
    create: XOR<CuisineCreateWithoutRestaurantCuisinesInput, CuisineUncheckedCreateWithoutRestaurantCuisinesInput>
    where?: CuisineWhereInput
  }

  export type CuisineUpdateToOneWithWhereWithoutRestaurantCuisinesInput = {
    where?: CuisineWhereInput
    data: XOR<CuisineUpdateWithoutRestaurantCuisinesInput, CuisineUncheckedUpdateWithoutRestaurantCuisinesInput>
  }

  export type CuisineUpdateWithoutRestaurantCuisinesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dishes?: DishUpdateManyWithoutCuisineNestedInput
  }

  export type CuisineUncheckedUpdateWithoutRestaurantCuisinesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dishes?: DishUncheckedUpdateManyWithoutCuisineNestedInput
  }

  export type RestaurantCreateWithoutDishesInput = {
    name: string
    address: string
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    restaurantCuisines?: RestaurantCuisineCreateNestedManyWithoutRestaurantInput
    restaurantReviews?: RestaurantReviewCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantUncheckedCreateWithoutDishesInput = {
    id?: number
    name: string
    address: string
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    restaurantCuisines?: RestaurantCuisineUncheckedCreateNestedManyWithoutRestaurantInput
    restaurantReviews?: RestaurantReviewUncheckedCreateNestedManyWithoutRestaurantInput
  }

  export type RestaurantCreateOrConnectWithoutDishesInput = {
    where: RestaurantWhereUniqueInput
    create: XOR<RestaurantCreateWithoutDishesInput, RestaurantUncheckedCreateWithoutDishesInput>
  }

  export type CuisineCreateWithoutDishesInput = {
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    restaurantCuisines?: RestaurantCuisineCreateNestedManyWithoutCuisineInput
  }

  export type CuisineUncheckedCreateWithoutDishesInput = {
    id?: number
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    restaurantCuisines?: RestaurantCuisineUncheckedCreateNestedManyWithoutCuisineInput
  }

  export type CuisineCreateOrConnectWithoutDishesInput = {
    where: CuisineWhereUniqueInput
    create: XOR<CuisineCreateWithoutDishesInput, CuisineUncheckedCreateWithoutDishesInput>
  }

  export type DishDietaryCreateWithoutDishInput = {
    dietary: DietaryRestrictionCreateNestedOneWithoutDishDietariesInput
  }

  export type DishDietaryUncheckedCreateWithoutDishInput = {
    dietaryId: number
  }

  export type DishDietaryCreateOrConnectWithoutDishInput = {
    where: DishDietaryWhereUniqueInput
    create: XOR<DishDietaryCreateWithoutDishInput, DishDietaryUncheckedCreateWithoutDishInput>
  }

  export type DishDietaryCreateManyDishInputEnvelope = {
    data: DishDietaryCreateManyDishInput | DishDietaryCreateManyDishInput[]
    skipDuplicates?: boolean
  }

  export type MealPlanDishCreateWithoutDishInput = {
    mealPlan: UserMealPlanCreateNestedOneWithoutMealPlanDishesInput
  }

  export type MealPlanDishUncheckedCreateWithoutDishInput = {
    mealPlanId: number
  }

  export type MealPlanDishCreateOrConnectWithoutDishInput = {
    where: MealPlanDishWhereUniqueInput
    create: XOR<MealPlanDishCreateWithoutDishInput, MealPlanDishUncheckedCreateWithoutDishInput>
  }

  export type MealPlanDishCreateManyDishInputEnvelope = {
    data: MealPlanDishCreateManyDishInput | MealPlanDishCreateManyDishInput[]
    skipDuplicates?: boolean
  }

  export type RestaurantUpsertWithoutDishesInput = {
    update: XOR<RestaurantUpdateWithoutDishesInput, RestaurantUncheckedUpdateWithoutDishesInput>
    create: XOR<RestaurantCreateWithoutDishesInput, RestaurantUncheckedCreateWithoutDishesInput>
    where?: RestaurantWhereInput
  }

  export type RestaurantUpdateToOneWithWhereWithoutDishesInput = {
    where?: RestaurantWhereInput
    data: XOR<RestaurantUpdateWithoutDishesInput, RestaurantUncheckedUpdateWithoutDishesInput>
  }

  export type RestaurantUpdateWithoutDishesInput = {
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restaurantCuisines?: RestaurantCuisineUpdateManyWithoutRestaurantNestedInput
    restaurantReviews?: RestaurantReviewUpdateManyWithoutRestaurantNestedInput
  }

  export type RestaurantUncheckedUpdateWithoutDishesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restaurantCuisines?: RestaurantCuisineUncheckedUpdateManyWithoutRestaurantNestedInput
    restaurantReviews?: RestaurantReviewUncheckedUpdateManyWithoutRestaurantNestedInput
  }

  export type CuisineUpsertWithoutDishesInput = {
    update: XOR<CuisineUpdateWithoutDishesInput, CuisineUncheckedUpdateWithoutDishesInput>
    create: XOR<CuisineCreateWithoutDishesInput, CuisineUncheckedCreateWithoutDishesInput>
    where?: CuisineWhereInput
  }

  export type CuisineUpdateToOneWithWhereWithoutDishesInput = {
    where?: CuisineWhereInput
    data: XOR<CuisineUpdateWithoutDishesInput, CuisineUncheckedUpdateWithoutDishesInput>
  }

  export type CuisineUpdateWithoutDishesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restaurantCuisines?: RestaurantCuisineUpdateManyWithoutCuisineNestedInput
  }

  export type CuisineUncheckedUpdateWithoutDishesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restaurantCuisines?: RestaurantCuisineUncheckedUpdateManyWithoutCuisineNestedInput
  }

  export type DishDietaryUpsertWithWhereUniqueWithoutDishInput = {
    where: DishDietaryWhereUniqueInput
    update: XOR<DishDietaryUpdateWithoutDishInput, DishDietaryUncheckedUpdateWithoutDishInput>
    create: XOR<DishDietaryCreateWithoutDishInput, DishDietaryUncheckedCreateWithoutDishInput>
  }

  export type DishDietaryUpdateWithWhereUniqueWithoutDishInput = {
    where: DishDietaryWhereUniqueInput
    data: XOR<DishDietaryUpdateWithoutDishInput, DishDietaryUncheckedUpdateWithoutDishInput>
  }

  export type DishDietaryUpdateManyWithWhereWithoutDishInput = {
    where: DishDietaryScalarWhereInput
    data: XOR<DishDietaryUpdateManyMutationInput, DishDietaryUncheckedUpdateManyWithoutDishInput>
  }

  export type MealPlanDishUpsertWithWhereUniqueWithoutDishInput = {
    where: MealPlanDishWhereUniqueInput
    update: XOR<MealPlanDishUpdateWithoutDishInput, MealPlanDishUncheckedUpdateWithoutDishInput>
    create: XOR<MealPlanDishCreateWithoutDishInput, MealPlanDishUncheckedCreateWithoutDishInput>
  }

  export type MealPlanDishUpdateWithWhereUniqueWithoutDishInput = {
    where: MealPlanDishWhereUniqueInput
    data: XOR<MealPlanDishUpdateWithoutDishInput, MealPlanDishUncheckedUpdateWithoutDishInput>
  }

  export type MealPlanDishUpdateManyWithWhereWithoutDishInput = {
    where: MealPlanDishScalarWhereInput
    data: XOR<MealPlanDishUpdateManyMutationInput, MealPlanDishUncheckedUpdateManyWithoutDishInput>
  }

  export type MealPlanDishScalarWhereInput = {
    AND?: MealPlanDishScalarWhereInput | MealPlanDishScalarWhereInput[]
    OR?: MealPlanDishScalarWhereInput[]
    NOT?: MealPlanDishScalarWhereInput | MealPlanDishScalarWhereInput[]
    mealPlanId?: IntFilter<"MealPlanDish"> | number
    dishId?: IntFilter<"MealPlanDish"> | number
  }

  export type DishCreateWithoutDishDietariesInput = {
    name: string
    description?: string | null
    calories?: number | null
    price?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    restaurant: RestaurantCreateNestedOneWithoutDishesInput
    cuisine?: CuisineCreateNestedOneWithoutDishesInput
    mealPlanDishes?: MealPlanDishCreateNestedManyWithoutDishInput
  }

  export type DishUncheckedCreateWithoutDishDietariesInput = {
    id?: number
    name: string
    description?: string | null
    calories?: number | null
    price?: number | null
    restaurantId: number
    cuisineId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mealPlanDishes?: MealPlanDishUncheckedCreateNestedManyWithoutDishInput
  }

  export type DishCreateOrConnectWithoutDishDietariesInput = {
    where: DishWhereUniqueInput
    create: XOR<DishCreateWithoutDishDietariesInput, DishUncheckedCreateWithoutDishDietariesInput>
  }

  export type DietaryRestrictionCreateWithoutDishDietariesInput = {
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userDietaries?: UserDietaryCreateNestedManyWithoutDietaryInput
  }

  export type DietaryRestrictionUncheckedCreateWithoutDishDietariesInput = {
    id?: number
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    userDietaries?: UserDietaryUncheckedCreateNestedManyWithoutDietaryInput
  }

  export type DietaryRestrictionCreateOrConnectWithoutDishDietariesInput = {
    where: DietaryRestrictionWhereUniqueInput
    create: XOR<DietaryRestrictionCreateWithoutDishDietariesInput, DietaryRestrictionUncheckedCreateWithoutDishDietariesInput>
  }

  export type DishUpsertWithoutDishDietariesInput = {
    update: XOR<DishUpdateWithoutDishDietariesInput, DishUncheckedUpdateWithoutDishDietariesInput>
    create: XOR<DishCreateWithoutDishDietariesInput, DishUncheckedCreateWithoutDishDietariesInput>
    where?: DishWhereInput
  }

  export type DishUpdateToOneWithWhereWithoutDishDietariesInput = {
    where?: DishWhereInput
    data: XOR<DishUpdateWithoutDishDietariesInput, DishUncheckedUpdateWithoutDishDietariesInput>
  }

  export type DishUpdateWithoutDishDietariesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restaurant?: RestaurantUpdateOneRequiredWithoutDishesNestedInput
    cuisine?: CuisineUpdateOneWithoutDishesNestedInput
    mealPlanDishes?: MealPlanDishUpdateManyWithoutDishNestedInput
  }

  export type DishUncheckedUpdateWithoutDishDietariesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    restaurantId?: IntFieldUpdateOperationsInput | number
    cuisineId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mealPlanDishes?: MealPlanDishUncheckedUpdateManyWithoutDishNestedInput
  }

  export type DietaryRestrictionUpsertWithoutDishDietariesInput = {
    update: XOR<DietaryRestrictionUpdateWithoutDishDietariesInput, DietaryRestrictionUncheckedUpdateWithoutDishDietariesInput>
    create: XOR<DietaryRestrictionCreateWithoutDishDietariesInput, DietaryRestrictionUncheckedCreateWithoutDishDietariesInput>
    where?: DietaryRestrictionWhereInput
  }

  export type DietaryRestrictionUpdateToOneWithWhereWithoutDishDietariesInput = {
    where?: DietaryRestrictionWhereInput
    data: XOR<DietaryRestrictionUpdateWithoutDishDietariesInput, DietaryRestrictionUncheckedUpdateWithoutDishDietariesInput>
  }

  export type DietaryRestrictionUpdateWithoutDishDietariesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userDietaries?: UserDietaryUpdateManyWithoutDietaryNestedInput
  }

  export type DietaryRestrictionUncheckedUpdateWithoutDishDietariesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userDietaries?: UserDietaryUncheckedUpdateManyWithoutDietaryNestedInput
  }

  export type UserCreateWithoutMealPlansInput = {
    name: string
    email: string
    passwordHash?: string | null
    provider: string
    providerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: UserLocationCreateNestedManyWithoutUserInput
    userDietaries?: UserDietaryCreateNestedManyWithoutUserInput
    calorieLogs?: UserCalorieLogCreateNestedManyWithoutUserInput
    restaurantReviews?: RestaurantReviewCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMealPlansInput = {
    id?: number
    name: string
    email: string
    passwordHash?: string | null
    provider: string
    providerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: UserLocationUncheckedCreateNestedManyWithoutUserInput
    userDietaries?: UserDietaryUncheckedCreateNestedManyWithoutUserInput
    calorieLogs?: UserCalorieLogUncheckedCreateNestedManyWithoutUserInput
    restaurantReviews?: RestaurantReviewUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMealPlansInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMealPlansInput, UserUncheckedCreateWithoutMealPlansInput>
  }

  export type MealPlanDishCreateWithoutMealPlanInput = {
    dish: DishCreateNestedOneWithoutMealPlanDishesInput
  }

  export type MealPlanDishUncheckedCreateWithoutMealPlanInput = {
    dishId: number
  }

  export type MealPlanDishCreateOrConnectWithoutMealPlanInput = {
    where: MealPlanDishWhereUniqueInput
    create: XOR<MealPlanDishCreateWithoutMealPlanInput, MealPlanDishUncheckedCreateWithoutMealPlanInput>
  }

  export type MealPlanDishCreateManyMealPlanInputEnvelope = {
    data: MealPlanDishCreateManyMealPlanInput | MealPlanDishCreateManyMealPlanInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutMealPlansInput = {
    update: XOR<UserUpdateWithoutMealPlansInput, UserUncheckedUpdateWithoutMealPlansInput>
    create: XOR<UserCreateWithoutMealPlansInput, UserUncheckedCreateWithoutMealPlansInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMealPlansInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMealPlansInput, UserUncheckedUpdateWithoutMealPlansInput>
  }

  export type UserUpdateWithoutMealPlansInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: UserLocationUpdateManyWithoutUserNestedInput
    userDietaries?: UserDietaryUpdateManyWithoutUserNestedInput
    calorieLogs?: UserCalorieLogUpdateManyWithoutUserNestedInput
    restaurantReviews?: RestaurantReviewUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMealPlansInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: UserLocationUncheckedUpdateManyWithoutUserNestedInput
    userDietaries?: UserDietaryUncheckedUpdateManyWithoutUserNestedInput
    calorieLogs?: UserCalorieLogUncheckedUpdateManyWithoutUserNestedInput
    restaurantReviews?: RestaurantReviewUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MealPlanDishUpsertWithWhereUniqueWithoutMealPlanInput = {
    where: MealPlanDishWhereUniqueInput
    update: XOR<MealPlanDishUpdateWithoutMealPlanInput, MealPlanDishUncheckedUpdateWithoutMealPlanInput>
    create: XOR<MealPlanDishCreateWithoutMealPlanInput, MealPlanDishUncheckedCreateWithoutMealPlanInput>
  }

  export type MealPlanDishUpdateWithWhereUniqueWithoutMealPlanInput = {
    where: MealPlanDishWhereUniqueInput
    data: XOR<MealPlanDishUpdateWithoutMealPlanInput, MealPlanDishUncheckedUpdateWithoutMealPlanInput>
  }

  export type MealPlanDishUpdateManyWithWhereWithoutMealPlanInput = {
    where: MealPlanDishScalarWhereInput
    data: XOR<MealPlanDishUpdateManyMutationInput, MealPlanDishUncheckedUpdateManyWithoutMealPlanInput>
  }

  export type UserMealPlanCreateWithoutMealPlanDishesInput = {
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutMealPlansInput
  }

  export type UserMealPlanUncheckedCreateWithoutMealPlanDishesInput = {
    id?: number
    userId: number
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserMealPlanCreateOrConnectWithoutMealPlanDishesInput = {
    where: UserMealPlanWhereUniqueInput
    create: XOR<UserMealPlanCreateWithoutMealPlanDishesInput, UserMealPlanUncheckedCreateWithoutMealPlanDishesInput>
  }

  export type DishCreateWithoutMealPlanDishesInput = {
    name: string
    description?: string | null
    calories?: number | null
    price?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    restaurant: RestaurantCreateNestedOneWithoutDishesInput
    cuisine?: CuisineCreateNestedOneWithoutDishesInput
    dishDietaries?: DishDietaryCreateNestedManyWithoutDishInput
  }

  export type DishUncheckedCreateWithoutMealPlanDishesInput = {
    id?: number
    name: string
    description?: string | null
    calories?: number | null
    price?: number | null
    restaurantId: number
    cuisineId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    dishDietaries?: DishDietaryUncheckedCreateNestedManyWithoutDishInput
  }

  export type DishCreateOrConnectWithoutMealPlanDishesInput = {
    where: DishWhereUniqueInput
    create: XOR<DishCreateWithoutMealPlanDishesInput, DishUncheckedCreateWithoutMealPlanDishesInput>
  }

  export type UserMealPlanUpsertWithoutMealPlanDishesInput = {
    update: XOR<UserMealPlanUpdateWithoutMealPlanDishesInput, UserMealPlanUncheckedUpdateWithoutMealPlanDishesInput>
    create: XOR<UserMealPlanCreateWithoutMealPlanDishesInput, UserMealPlanUncheckedCreateWithoutMealPlanDishesInput>
    where?: UserMealPlanWhereInput
  }

  export type UserMealPlanUpdateToOneWithWhereWithoutMealPlanDishesInput = {
    where?: UserMealPlanWhereInput
    data: XOR<UserMealPlanUpdateWithoutMealPlanDishesInput, UserMealPlanUncheckedUpdateWithoutMealPlanDishesInput>
  }

  export type UserMealPlanUpdateWithoutMealPlanDishesInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMealPlansNestedInput
  }

  export type UserMealPlanUncheckedUpdateWithoutMealPlanDishesInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DishUpsertWithoutMealPlanDishesInput = {
    update: XOR<DishUpdateWithoutMealPlanDishesInput, DishUncheckedUpdateWithoutMealPlanDishesInput>
    create: XOR<DishCreateWithoutMealPlanDishesInput, DishUncheckedCreateWithoutMealPlanDishesInput>
    where?: DishWhereInput
  }

  export type DishUpdateToOneWithWhereWithoutMealPlanDishesInput = {
    where?: DishWhereInput
    data: XOR<DishUpdateWithoutMealPlanDishesInput, DishUncheckedUpdateWithoutMealPlanDishesInput>
  }

  export type DishUpdateWithoutMealPlanDishesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restaurant?: RestaurantUpdateOneRequiredWithoutDishesNestedInput
    cuisine?: CuisineUpdateOneWithoutDishesNestedInput
    dishDietaries?: DishDietaryUpdateManyWithoutDishNestedInput
  }

  export type DishUncheckedUpdateWithoutMealPlanDishesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    restaurantId?: IntFieldUpdateOperationsInput | number
    cuisineId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dishDietaries?: DishDietaryUncheckedUpdateManyWithoutDishNestedInput
  }

  export type UserCreateWithoutCalorieLogsInput = {
    name: string
    email: string
    passwordHash?: string | null
    provider: string
    providerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: UserLocationCreateNestedManyWithoutUserInput
    userDietaries?: UserDietaryCreateNestedManyWithoutUserInput
    mealPlans?: UserMealPlanCreateNestedManyWithoutUserInput
    restaurantReviews?: RestaurantReviewCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCalorieLogsInput = {
    id?: number
    name: string
    email: string
    passwordHash?: string | null
    provider: string
    providerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    locations?: UserLocationUncheckedCreateNestedManyWithoutUserInput
    userDietaries?: UserDietaryUncheckedCreateNestedManyWithoutUserInput
    mealPlans?: UserMealPlanUncheckedCreateNestedManyWithoutUserInput
    restaurantReviews?: RestaurantReviewUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCalorieLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCalorieLogsInput, UserUncheckedCreateWithoutCalorieLogsInput>
  }

  export type UserUpsertWithoutCalorieLogsInput = {
    update: XOR<UserUpdateWithoutCalorieLogsInput, UserUncheckedUpdateWithoutCalorieLogsInput>
    create: XOR<UserCreateWithoutCalorieLogsInput, UserUncheckedCreateWithoutCalorieLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCalorieLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCalorieLogsInput, UserUncheckedUpdateWithoutCalorieLogsInput>
  }

  export type UserUpdateWithoutCalorieLogsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: UserLocationUpdateManyWithoutUserNestedInput
    userDietaries?: UserDietaryUpdateManyWithoutUserNestedInput
    mealPlans?: UserMealPlanUpdateManyWithoutUserNestedInput
    restaurantReviews?: RestaurantReviewUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCalorieLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: StringFieldUpdateOperationsInput | string
    providerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: UserLocationUncheckedUpdateManyWithoutUserNestedInput
    userDietaries?: UserDietaryUncheckedUpdateManyWithoutUserNestedInput
    mealPlans?: UserMealPlanUncheckedUpdateManyWithoutUserNestedInput
    restaurantReviews?: RestaurantReviewUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserLocationCreateManyUserInput = {
    id?: number
    name: string
    latitude: number
    longitude: number
  }

  export type UserDietaryCreateManyUserInput = {
    dietaryId: number
  }

  export type UserMealPlanCreateManyUserInput = {
    id?: number
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCalorieLogCreateManyUserInput = {
    id?: number
    date: Date | string
    calories: number
    createdAt?: Date | string
  }

  export type RestaurantReviewCreateManyUserInput = {
    id?: number
    restaurantId: number
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserLocationUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
  }

  export type UserLocationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
  }

  export type UserLocationUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
  }

  export type UserDietaryUpdateWithoutUserInput = {
    dietary?: DietaryRestrictionUpdateOneRequiredWithoutUserDietariesNestedInput
  }

  export type UserDietaryUncheckedUpdateWithoutUserInput = {
    dietaryId?: IntFieldUpdateOperationsInput | number
  }

  export type UserDietaryUncheckedUpdateManyWithoutUserInput = {
    dietaryId?: IntFieldUpdateOperationsInput | number
  }

  export type UserMealPlanUpdateWithoutUserInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mealPlanDishes?: MealPlanDishUpdateManyWithoutMealPlanNestedInput
  }

  export type UserMealPlanUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mealPlanDishes?: MealPlanDishUncheckedUpdateManyWithoutMealPlanNestedInput
  }

  export type UserMealPlanUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCalorieLogUpdateWithoutUserInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    calories?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCalorieLogUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    calories?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCalorieLogUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    calories?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestaurantReviewUpdateWithoutUserInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restaurant?: RestaurantUpdateOneRequiredWithoutRestaurantReviewsNestedInput
  }

  export type RestaurantReviewUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    restaurantId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestaurantReviewUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    restaurantId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDietaryCreateManyDietaryInput = {
    userId: number
  }

  export type DishDietaryCreateManyDietaryInput = {
    dishId: number
  }

  export type UserDietaryUpdateWithoutDietaryInput = {
    user?: UserUpdateOneRequiredWithoutUserDietariesNestedInput
  }

  export type UserDietaryUncheckedUpdateWithoutDietaryInput = {
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type UserDietaryUncheckedUpdateManyWithoutDietaryInput = {
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type DishDietaryUpdateWithoutDietaryInput = {
    dish?: DishUpdateOneRequiredWithoutDishDietariesNestedInput
  }

  export type DishDietaryUncheckedUpdateWithoutDietaryInput = {
    dishId?: IntFieldUpdateOperationsInput | number
  }

  export type DishDietaryUncheckedUpdateManyWithoutDietaryInput = {
    dishId?: IntFieldUpdateOperationsInput | number
  }

  export type DishCreateManyRestaurantInput = {
    id?: number
    name: string
    description?: string | null
    calories?: number | null
    price?: number | null
    cuisineId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RestaurantCuisineCreateManyRestaurantInput = {
    cuisineId: number
  }

  export type RestaurantReviewCreateManyRestaurantInput = {
    id?: number
    userId: number
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DishUpdateWithoutRestaurantInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cuisine?: CuisineUpdateOneWithoutDishesNestedInput
    dishDietaries?: DishDietaryUpdateManyWithoutDishNestedInput
    mealPlanDishes?: MealPlanDishUpdateManyWithoutDishNestedInput
  }

  export type DishUncheckedUpdateWithoutRestaurantInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    cuisineId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dishDietaries?: DishDietaryUncheckedUpdateManyWithoutDishNestedInput
    mealPlanDishes?: MealPlanDishUncheckedUpdateManyWithoutDishNestedInput
  }

  export type DishUncheckedUpdateManyWithoutRestaurantInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    cuisineId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestaurantCuisineUpdateWithoutRestaurantInput = {
    cuisine?: CuisineUpdateOneRequiredWithoutRestaurantCuisinesNestedInput
  }

  export type RestaurantCuisineUncheckedUpdateWithoutRestaurantInput = {
    cuisineId?: IntFieldUpdateOperationsInput | number
  }

  export type RestaurantCuisineUncheckedUpdateManyWithoutRestaurantInput = {
    cuisineId?: IntFieldUpdateOperationsInput | number
  }

  export type RestaurantReviewUpdateWithoutRestaurantInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRestaurantReviewsNestedInput
  }

  export type RestaurantReviewUncheckedUpdateWithoutRestaurantInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestaurantReviewUncheckedUpdateManyWithoutRestaurantInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DishCreateManyCuisineInput = {
    id?: number
    name: string
    description?: string | null
    calories?: number | null
    price?: number | null
    restaurantId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RestaurantCuisineCreateManyCuisineInput = {
    restaurantId: number
  }

  export type DishUpdateWithoutCuisineInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    restaurant?: RestaurantUpdateOneRequiredWithoutDishesNestedInput
    dishDietaries?: DishDietaryUpdateManyWithoutDishNestedInput
    mealPlanDishes?: MealPlanDishUpdateManyWithoutDishNestedInput
  }

  export type DishUncheckedUpdateWithoutCuisineInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    restaurantId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dishDietaries?: DishDietaryUncheckedUpdateManyWithoutDishNestedInput
    mealPlanDishes?: MealPlanDishUncheckedUpdateManyWithoutDishNestedInput
  }

  export type DishUncheckedUpdateManyWithoutCuisineInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    calories?: NullableIntFieldUpdateOperationsInput | number | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    restaurantId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RestaurantCuisineUpdateWithoutCuisineInput = {
    restaurant?: RestaurantUpdateOneRequiredWithoutRestaurantCuisinesNestedInput
  }

  export type RestaurantCuisineUncheckedUpdateWithoutCuisineInput = {
    restaurantId?: IntFieldUpdateOperationsInput | number
  }

  export type RestaurantCuisineUncheckedUpdateManyWithoutCuisineInput = {
    restaurantId?: IntFieldUpdateOperationsInput | number
  }

  export type DishDietaryCreateManyDishInput = {
    dietaryId: number
  }

  export type MealPlanDishCreateManyDishInput = {
    mealPlanId: number
  }

  export type DishDietaryUpdateWithoutDishInput = {
    dietary?: DietaryRestrictionUpdateOneRequiredWithoutDishDietariesNestedInput
  }

  export type DishDietaryUncheckedUpdateWithoutDishInput = {
    dietaryId?: IntFieldUpdateOperationsInput | number
  }

  export type DishDietaryUncheckedUpdateManyWithoutDishInput = {
    dietaryId?: IntFieldUpdateOperationsInput | number
  }

  export type MealPlanDishUpdateWithoutDishInput = {
    mealPlan?: UserMealPlanUpdateOneRequiredWithoutMealPlanDishesNestedInput
  }

  export type MealPlanDishUncheckedUpdateWithoutDishInput = {
    mealPlanId?: IntFieldUpdateOperationsInput | number
  }

  export type MealPlanDishUncheckedUpdateManyWithoutDishInput = {
    mealPlanId?: IntFieldUpdateOperationsInput | number
  }

  export type MealPlanDishCreateManyMealPlanInput = {
    dishId: number
  }

  export type MealPlanDishUpdateWithoutMealPlanInput = {
    dish?: DishUpdateOneRequiredWithoutMealPlanDishesNestedInput
  }

  export type MealPlanDishUncheckedUpdateWithoutMealPlanInput = {
    dishId?: IntFieldUpdateOperationsInput | number
  }

  export type MealPlanDishUncheckedUpdateManyWithoutMealPlanInput = {
    dishId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}