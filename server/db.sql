--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: individuals; Type: TABLE; Schema: public; Owner: beigeh0ney
--

CREATE TABLE public.individuals (
    id integer NOT NULL,
    individuals_nickname character varying(255),
    sex character varying(255),
    species_id integer,
    record_creation timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.individuals OWNER TO beigeh0ney;

--
-- Name: individuals_id_seq; Type: SEQUENCE; Schema: public; Owner: beigeh0ney
--

CREATE SEQUENCE public.individuals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.individuals_id_seq OWNER TO beigeh0ney;

--
-- Name: individuals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: beigeh0ney
--

ALTER SEQUENCE public.individuals_id_seq OWNED BY public.individuals.id;


--
-- Name: sightings; Type: TABLE; Schema: public; Owner: beigeh0ney
--

CREATE TABLE public.sightings (
    id integer NOT NULL,
    individual_id integer,
    sighting_date date,
    location character varying(255),
    healthy boolean,
    researcher_email character varying(255),
    record_creation timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    individuals_nickname character varying
);


ALTER TABLE public.sightings OWNER TO beigeh0ney;

--
-- Name: sightings_id_seq; Type: SEQUENCE; Schema: public; Owner: beigeh0ney
--

CREATE SEQUENCE public.sightings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sightings_id_seq OWNER TO beigeh0ney;

--
-- Name: sightings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: beigeh0ney
--

ALTER SEQUENCE public.sightings_id_seq OWNED BY public.sightings.id;


--
-- Name: species; Type: TABLE; Schema: public; Owner: beigeh0ney
--

CREATE TABLE public.species (
    id integer NOT NULL,
    common_name character varying(255),
    scientific_name character varying(255),
    population integer,
    conservation_status character varying(255),
    record_creation timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.species OWNER TO beigeh0ney;

--
-- Name: species_id_seq; Type: SEQUENCE; Schema: public; Owner: beigeh0ney
--

CREATE SEQUENCE public.species_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.species_id_seq OWNER TO beigeh0ney;

--
-- Name: species_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: beigeh0ney
--

ALTER SEQUENCE public.species_id_seq OWNED BY public.species.id;


--
-- Name: individuals id; Type: DEFAULT; Schema: public; Owner: beigeh0ney
--

ALTER TABLE ONLY public.individuals ALTER COLUMN id SET DEFAULT nextval('public.individuals_id_seq'::regclass);


--
-- Name: sightings id; Type: DEFAULT; Schema: public; Owner: beigeh0ney
--

ALTER TABLE ONLY public.sightings ALTER COLUMN id SET DEFAULT nextval('public.sightings_id_seq'::regclass);


--
-- Name: species id; Type: DEFAULT; Schema: public; Owner: beigeh0ney
--

ALTER TABLE ONLY public.species ALTER COLUMN id SET DEFAULT nextval('public.species_id_seq'::regclass);


--
-- Data for Name: individuals; Type: TABLE DATA; Schema: public; Owner: beigeh0ney
--

COPY public.individuals (id, individuals_nickname, sex, species_id, record_creation) FROM stdin;
1       Lou     Male    1       2024-09-17 23:45:34.013557
2       Benji   Male    2       2024-09-17 23:47:50.440617
3       Luna    Female  3       2024-09-17 23:48:06.528997
\.


--
-- Data for Name: sightings; Type: TABLE DATA; Schema: public; Owner: beigeh0ney
--

COPY public.sightings (id, individual_id, sighting_date, location, healthy, researcher_email, record_creation, individuals_nickname) FROM stdin;
1       1       2022-09-05      Hawaii  t       emma@gmail.com  2024-09-17 23:58:04.30803       Lou
2       3       2023-02-04      New Mexico      t       kevin@gmail.com 2024-09-17 23:59:36.401471      Luna
3       2       2023-05-26      Florida t       jerry@gmail.com 2024-09-18 00:00:26.501608      Benji
4       3       2023-10-09      Arizona f       anna@gmail.com  2024-09-18 00:01:35.861609      Luna
5       1       2024-03-18      California      t       sarah@gmail.com 2024-09-18 00:02:25.038417      Lou
6       3       2024-09-18      California      f       eric@gmail.com  2024-09-18 00:03:12.230546      Luna
\.


--
-- Data for Name: species; Type: TABLE DATA; Schema: public; Owner: beigeh0ney
--

COPY public.species (id, common_name, scientific_name, population, conservation_status, record_creation) FROM stdin;
1       Hawaiian Monk Seal      Neomonachus schauinslandi       1400    Endangered      2024-09-17 23:31:13.541873
2       Florida Panther Puma concolor   200     Critically Endangered   2024-09-17 23:32:41.011017
3       Mexican Wolf    Canis lupus baileyi     257     Critically Endangered   2024-09-17 23:33:19.56862
\.


--
-- Name: individuals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: beigeh0ney
--

SELECT pg_catalog.setval('public.individuals_id_seq', 9, true);


--
-- Name: sightings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: beigeh0ney
--

SELECT pg_catalog.setval('public.sightings_id_seq', 11, true);


--
-- Name: species_id_seq; Type: SEQUENCE SET; Schema: public; Owner: beigeh0ney
--

SELECT pg_catalog.setval('public.species_id_seq', 5, true);


--
-- Name: individuals individuals_pkey; Type: CONSTRAINT; Schema: public; Owner: beigeh0ney
--

ALTER TABLE ONLY public.individuals
    ADD CONSTRAINT individuals_pkey PRIMARY KEY (id);


--
-- Name: sightings sightings_pkey; Type: CONSTRAINT; Schema: public; Owner: beigeh0ney
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_pkey PRIMARY KEY (id);


--
-- Name: species species_pkey; Type: CONSTRAINT; Schema: public; Owner: beigeh0ney
--

ALTER TABLE ONLY public.species
    ADD CONSTRAINT species_pkey PRIMARY KEY (id);


--
-- Name: individuals individuals_species_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: beigeh0ney
--

ALTER TABLE ONLY public.individuals
    ADD CONSTRAINT individuals_species_id_fkey FOREIGN KEY (species_id) REFERENCES public.species(id);


--
-- Name: sightings sightings_individual_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: beigeh0ney
--

ALTER TABLE ONLY public.sightings
    ADD CONSTRAINT sightings_individual_id_fkey FOREIGN KEY (individual_id) REFERENCES public.individuals(id);


--
-- PostgreSQL database dump complete
--

