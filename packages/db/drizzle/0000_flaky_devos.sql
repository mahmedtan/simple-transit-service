CREATE TABLE "bookmarked_lines" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bookmarked_lines_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"line_code" varchar NOT NULL,
	"created_at" timestamp DEFAULT now()
);
