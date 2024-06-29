/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    media: Media;
    courses: Course;
    sources: Source;
    lessons: Lesson;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  name?: string | null;
  role?: ('admin' | 'user') | null;
  userProfile?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  userData?: {
    userLessons?:
      | {
          lesson?: (number | null) | Lesson;
          isCompleted?: boolean | null;
          data?:
            | {
                [k: string]: unknown;
              }
            | unknown[]
            | string
            | number
            | boolean
            | null;
          id?: string | null;
        }[]
      | null;
    userCourses?:
      | {
          course?: (number | null) | Course;
          isCompleted?: boolean | null;
          data?:
            | {
                [k: string]: unknown;
              }
            | unknown[]
            | string
            | number
            | boolean
            | null;
          id?: string | null;
        }[]
      | null;
  };
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "lessons".
 */
export interface Lesson {
  id: number;
  title: string;
  slug?: string | null;
  description?: string | null;
  cloudinaryUrl?: string | null;
  number?: number | null;
  course?: (number | null) | Course;
  scenes?:
    | (
        | {
            sceneText?: string | null;
            cloudinaryUrl?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'noInteraction';
          }
        | {
            sceneText?: string | null;
            cloudinaryUrl?: string | null;
            question?: string | null;
            answerChoices?:
              | {
                  answerText?: string | null;
                  answerMessage?: string | null;
                  isCorrect?: boolean | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'mcKnowledgeCheck';
          }
        | {
            sceneText?: string | null;
            cloudinaryUrl?: string | null;
            question?: string | null;
            answerChoices?:
              | {
                  answerText?: string | null;
                  answerMessage?: string | null;
                  decisionSlug?: string | null;
                  id?: string | null;
                }[]
              | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'mcDecisionPoint';
          }
      )[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "courses".
 */
export interface Course {
  id: number;
  title: string;
  slug?: string | null;
  description?: string | null;
  cloudinaryUrl?: string | null;
  sources?: (number | Source)[] | null;
  lessons?: (number | Lesson)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "sources".
 */
export interface Source {
  id: number;
  title: string;
  slug?: string | null;
  url?: string | null;
  description?: string | null;
  author?: string | null;
  cloudinaryUrl?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}