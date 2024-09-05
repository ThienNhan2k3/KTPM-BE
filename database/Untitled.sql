-- DROP TABLE answers CASCADE;
-- DROP TABLE brands CASCADE;
-- DROP TABLE events CASCADE;
-- DROP TABLE fav_events CASCADE;
-- DROP TABLE games CASCADE;
-- DROP TABLE gift_items_history CASCADE;
-- DROP TABLE questions CASCADE;
-- DROP TABLE quizes CASCADE;
-- DROP TABLE user_event_details CASCADE;
-- DROP TABLE user_events CASCADE;
-- DROP TABLE user_vouchers CASCADE;
-- DROP TABLE users CASCADE;
-- DROP TABLE voucher_exchange_history CASCADE;
-- DROP TABLE vouchers CASCADE;
-- DROP TABLE vouchers_in_event CASCADE;
-- DROP TABLE items CASCADE;
-- DROP TABLE user_items CASCADE;

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "full_name" varchar,
  "user_name" varchar,
  "password" varchar,
  "avatar" varchar,
  "dob" date,
  "gender" varchar,
  "fb_acc" varchar,
  "email" varchar,
  "phone" integer,
  "type" varchar,
  "status" varchar,
  "time_update" timestamp
);

CREATE TABLE "brands" (
  "id" uuid PRIMARY KEY,
  "brand_name" varchar,
  "industry" varchar,
  "password" varchar,
  "email" varchar,
  "phone" integer,
  "address" varchar,
  "gps" varchar,
  "status" varchar,
  "time_update" timestamp
);

CREATE TABLE "games" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "image" varchar,
  "type" varchar,
  "istrade" boolean,
  "introduce" text,
  "award" text,
  "time_update" timestamp
);

CREATE TABLE "events" (
  "id" uuid PRIMARY KEY,
  "id_game" uuid,
  "id_brand" uuid,
  "name" varchar,
  "image" varchar,
  "start_time" date,
  "end_time" date,
  "time_update" timestamp
);

CREATE TABLE "quizes" (
  "id" uuid PRIMARY KEY,
  "id_event" uuid,
  "id_game" uuid,
  "time_update" timestamp
);

CREATE TABLE "questions" (
  "id" uuid PRIMARY KEY,
  "id_quiz" uuid,
  "question" varchar,
  "time_update" timestamp
);

CREATE TABLE "answers" (
  "id" uuid PRIMARY KEY,
  "id_question" uuid,
  "answer" varchar,
  "status" boolean,
  "time_update" timestamp
);

CREATE TABLE "fav_events" (
  "id_event" uuid,
  "id_user" uuid,
  "time_update" timestamp
);

CREATE TABLE "user_events" (
  "id" uuid PRIMARY KEY,
  "id_user" uuid,
  "id_event" uuid,
  "playthrough" integer,
  "time_update" timestamp
);

CREATE TABLE "user_event_details" (
  "id_user_event" uuid,
  "time_update" timestamp
);

CREATE TABLE "vouchers" (
  "voucher_code" varchar UNIQUE PRIMARY KEY,
  "id_brand" uuid,
  "image" varchar,
  "value" integer,
  "max_discount" integer,
  "description" text,
  "status" varchar,
  "time_update" timestamp
);

CREATE TABLE "vouchers_in_event" (
  "id" uuid PRIMARY KEY,
  "id_voucher_code" varchar,
  "id_event" uuid,
  "exp_date" date,
  "total_quantity" integer,
  "time_update" timestamp
);

CREATE TABLE "user_vouchers" (
  "id_voucher" uuid,
  "id_user" uuid,
  "quantity" integer,
  "time_update" timestamp
);

CREATE TABLE "items" (
  "id" uuid PRIMARY KEY,
  "id_event" uuid,
  "name" varchar,
  "image" varchar,
  "time_update" timestamp
);

CREATE TABLE "user_items" (
  "id_item" uuid,
  "id_user" uuid,
  "quantity" integer,
  "time_update" timestamp
);

CREATE TABLE "gift_items_history" (
  "id" uuid PRIMARY KEY,
  "id_giver" uuid,
  "id_recipient" uuid,
  "id_item" uuid,
  "id_game" uuid,
  "gift_time" timestamp
);

CREATE TABLE "voucher_exchange_history" (
  "id" uuid PRIMARY KEY,
  "id_user" uuid,
  "id_item" uuid,
  "id_voucher" uuid,
  "time" timestamp
);

ALTER TABLE "events" ADD FOREIGN KEY ("id_game") REFERENCES "games" ("id");

ALTER TABLE "events" ADD FOREIGN KEY ("id_brand") REFERENCES "brands" ("id");

ALTER TABLE "quizes" ADD FOREIGN KEY ("id_event") REFERENCES "events" ("id");

ALTER TABLE "quizes" ADD FOREIGN KEY ("id_game") REFERENCES "games" ("id");

ALTER TABLE "questions" ADD FOREIGN KEY ("id_quiz") REFERENCES "quizes" ("id");

ALTER TABLE "answers" ADD FOREIGN KEY ("id_question") REFERENCES "questions" ("id");

ALTER TABLE "fav_events" ADD FOREIGN KEY ("id_event") REFERENCES "events" ("id");

ALTER TABLE "fav_events" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");

ALTER TABLE "user_events" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");

ALTER TABLE "user_events" ADD FOREIGN KEY ("id_event") REFERENCES "events" ("id");

ALTER TABLE "user_event_details" ADD FOREIGN KEY ("id_user_event") REFERENCES "user_events" ("id");

ALTER TABLE "vouchers" ADD FOREIGN KEY ("id_brand") REFERENCES "brands" ("id");

ALTER TABLE "vouchers_in_event" ADD FOREIGN KEY ("id_voucher_code") REFERENCES "vouchers" ("voucher_code");

ALTER TABLE "vouchers_in_event" ADD FOREIGN KEY ("id_event") REFERENCES "events" ("id");

ALTER TABLE "user_vouchers" ADD FOREIGN KEY ("id_voucher") REFERENCES "vouchers_in_event" ("id");

ALTER TABLE "user_vouchers" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");

ALTER TABLE "items" ADD FOREIGN KEY ("id_event") REFERENCES "events" ("id");

ALTER TABLE "user_items" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");

ALTER TABLE "user_items" ADD FOREIGN KEY ("id_item") REFERENCES "items" ("id");

ALTER TABLE "gift_items_history" ADD FOREIGN KEY ("id_giver") REFERENCES "users" ("id");

ALTER TABLE "gift_items_history" ADD FOREIGN KEY ("id_recipient") REFERENCES "users" ("id");

ALTER TABLE "gift_items_history" ADD FOREIGN KEY ("id_game") REFERENCES "games" ("id");

ALTER TABLE "voucher_exchange_history" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");

ALTER TABLE "voucher_exchange_history" ADD FOREIGN KEY ("id_voucher") REFERENCES "vouchers_in_event" ("id");

ALTER TABLE "voucher_exchange_history" ADD FOREIGN KEY ("id_item") REFERENCES "items" ("id");


