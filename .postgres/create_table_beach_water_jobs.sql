create table beach_water_jobs (
  id serial primary key,
  last_collection_date timestamp,
  created_on timestamp default current_timestamp
)