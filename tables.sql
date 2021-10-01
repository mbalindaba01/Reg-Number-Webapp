create table towns (
    town_id serial not null primary key, 
    town_name varchar not null
);

create table reg_numbers (
    reg_id serial not null primary key, 
    town_ref int, 
    foreign key (town_ref) references towns(town_id), 
    reg_num varchar not null
);

insert into towns (town_name) values ('Cape Town'), ('Bellville'), ('Paarl'); 