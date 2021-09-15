/*
   Copyright Avero, LLC
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

type CreateFun<
  Parts extends string,
  QueryParams extends string
> = Parts extends `:${infer A}`
  ? (
      params: Record<GetParam<Parts>, string> & {
        query?: Partial<Record<QueryParams, string | null>>;
      }
    ) => string
  : (params?: {
      query?: Partial<Record<QueryParams, string | null>>;
    }) => string;

export interface Route<Parts extends string, QueryParams extends string> {
  template(): string;

  create: CreateFun<Parts, QueryParams>;

  route: <Parts1 extends string, QueryParams1 extends string>(arg: {
    path: Parts1[];
    query?: QueryParams1[];
  }) => Route<Parts1 | Parts, QueryParams | QueryParams1>;

  useQueryParams(): Partial<Record<QueryParams, string>>;

  useParams(): Record<GetParam<Parts>, string>;
}

/**
 * @ignore
 */
export type PathParam<T extends string> = T extends `:${infer A}` ? A : never;

/**
 * @ignore
 */
export type PathPart<T extends string> = string | PathParam<T>;

export type GetParam<T extends string> = T extends `:${infer A}` ? A : never;
