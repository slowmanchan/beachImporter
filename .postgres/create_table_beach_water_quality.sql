create table beach_water_quality (
  id serial primary key,
  beach_water_job_id int references beach_water_jobs (id),
  beach_info_id int references beach_info (id),
  e_coli int,
  advisory text,
  collection_date timestamp,
  status_flag text
)
