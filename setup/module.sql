\c postgres
drop database bookshop;

create database bookshop;
\c bookshop 

drop table if exists users cascade;
create table users (
    user_id serial primary key,
    user_name character varying(30) not null unique,
    user_password character varying(100) not null,
    user_is_admin boolean not null default false,
    user_created_at timestamptz default current_timestamp
);

drop table if exists categories cascade;
create table categories (
    category_id serial primary key,
    category_name character varying(200) not null,
    category_img character varying(200) not null
);


drop table if exists products cascade;
create table products (
    product_id serial primary key,
    category_id int not null references categories (category_id),
    product_name character varying(100) not null,
    product_img text not null,
    product_price numeric(10,2) not null,
    short_description character varying(100) not null,
    long_description character varying(300) not null,
    product_created_at timestamptz default current_timestamp
);

drop table if exists orders cascade;
create table orders (
    order_id serial primary key,
    user_id int not null references users (user_id),
    product_id int not null references products (product_id),
    product_price int not null,
    order_count int not null default 1,
    order_created_at timestamptz default current_timestamp
);

