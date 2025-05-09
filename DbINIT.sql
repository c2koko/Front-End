
-- Movies beszúrása
INSERT INTO Movies (MovieName, MovieDescription, MovieDuration, MovieImg) VALUES
('The Great Adventure', 'A thrilling journey through uncharted lands.', 120, 'https://t3.ftcdn.net/jpg/00/77/60/98/360_F_77609841_pzTmGoonZAYWQYSKBkoxp26Kr0LT8lln.jpg'),
('Romance in Bloom', 'A touching love story set in the countryside.', 95, 'https://images.fastcompany.com/image/upload/f_webp,q_auto,c_fit/wp-cms-2/2024/11/p-1-91232740-flow-movie-bts.jpg'),
('Galactic Battle', 'An epic space war between rival factions.', 145, 'https://t3.ftcdn.net/jpg/00/77/60/98/360_F_77609841_pzTmGoonZAYWQYSKBkoxp26Kr0LT8lln.jpg'),
('Mystery Manor', 'A detective uncovers secrets in an old mansion.', 110, 'https://t3.ftcdn.net/jpg/00/77/60/98/360_F_77609841_pzTmGoonZAYWQYSKBkoxp26Kr0LT8lln.jpg'),
('City Lights', 'A drama about life in a bustling metropolis.', 130, 'https://t3.ftcdn.net/jpg/00/77/60/98/360_F_77609841_pzTmGoonZAYWQYSKBkoxp26Kr0LT8lln.jpg'),
('Underwater Quest', 'A marine biologist explores ocean mysteries.', 115, 'https://images.fastcompany.com/image/upload/f_webp,q_auto,c_fit/wp-cms-2/2024/11/p-1-91232740-flow-movie-bts.jpg'),
('Time Loop', 'A man relives the same day over and over.', 100, 'https://t3.ftcdn.net/jpg/00/77/60/98/360_F_77609841_pzTmGoonZAYWQYSKBkoxp26Kr0LT8lln.jpg'),
('Desert Storm', 'Survivors trek across a post-apocalyptic desert.', 140, 'https://t3.ftcdn.net/jpg/00/77/60/98/360_F_77609841_pzTmGoonZAYWQYSKBkoxp26Kr0LT8lln.jpg'),
('Haunted Hills', 'Teenagers encounter ghosts on a camping trip.', 105, 'https://images.fastcompany.com/image/upload/f_webp,q_auto,c_fit/wp-cms-2/2024/11/p-1-91232740-flow-movie-bts.jpg'),
('Cyber Hunt', 'A hacker races against time to stop a virus.', 125, 'https://t3.ftcdn.net/jpg/00/77/60/98/360_F_77609841_pzTmGoonZAYWQYSKBkoxp26Kr0LT8lln.jpg'),
('Final Stand', 'Warriors make a last stand against invaders.', 135, 'https://t3.ftcdn.net/jpg/00/77/60/98/360_F_77609841_pzTmGoonZAYWQYSKBkoxp26Kr0LT8lln.jpg'),
('Love Beyond Time', 'Lovers meet across different eras.', 118, 'https://t3.ftcdn.net/jpg/00/77/60/98/360_F_77609841_pzTmGoonZAYWQYSKBkoxp26Kr0LT8lln.jpg'),
('The Chef''s Table', 'A chef finds inspiration in unexpected places.', 97, 'https://t3.ftcdn.net/jpg/00/77/60/98/360_F_77609841_pzTmGoonZAYWQYSKBkoxp26Kr0LT8lln.jpg'),
('Wild Skies', 'Pilots navigate danger during wartime.', 123, 'https://t3.ftcdn.net/jpg/00/77/60/98/360_F_77609841_pzTmGoonZAYWQYSKBkoxp26Kr0LT8lln.jpg'),
('Neon Dreams', 'A young musician chases fame in the city.', 101, 'https://t3.ftcdn.net/jpg/00/77/60/98/360_F_77609841_pzTmGoonZAYWQYSKBkoxp26Kr0LT8lln.jpg'),
('Frozen Earth', 'Scientists struggle to survive an ice age.', 132, 'https://t3.ftcdn.net/jpg/00/77/60/98/360_F_77609841_pzTmGoonZAYWQYSKBkoxp26Kr0LT8lln.jpg'),
('Crimson Tide', 'Submarine crew faces a deadly standoff.', 122, 'https://t3.ftcdn.net/jpg/00/77/60/98/360_F_77609841_pzTmGoonZAYWQYSKBkoxp26Kr0LT8lln.jpg'),
('Jungle Whisper', 'A zoologist unravels a mystery in the Amazon.', 107, 'https://t3.ftcdn.net/jpg/00/77/60/98/360_F_77609841_pzTmGoonZAYWQYSKBkoxp26Kr0LT8lln.jpg'),
('Silent Code', 'A spy loses his voice and must still complete his mission.', 119, 'https://t3.ftcdn.net/jpg/00/77/60/98/360_F_77609841_pzTmGoonZAYWQYSKBkoxp26Kr0LT8lln.jpg'),
('Black Horizon', 'Astronauts face doom near a black hole.', 137, 'https://t3.ftcdn.net/jpg/00/77/60/98/360_F_77609841_pzTmGoonZAYWQYSKBkoxp26Kr0LT8lln.jpg');

-- Rooms beszúrása (Id-t nem adjuk meg, csak a Name-et!)
INSERT INTO Rooms (RoomName) VALUES
('szoba1'),
('szoba2'),
('szoba3'),
('szoba4');

INSERT INTO Screenings (ScreeningStartTime, MovieId, RoomId) VALUES
('2025-05-16 08:00:00', 1, 1),
('2025-05-22 14:30:00', 1, 2),
('2025-05-29 19:00:00', 1, 3),
('2025-06-05 11:15:00', 1, 1),
('2025-06-12 16:45:00', 1, 2),
('2025-06-19 21:00:00', 1, 3),
('2025-05-18 10:45:00', 1, 1),
('2025-05-25 17:00:00', 1, 2),
('2025-06-01 13:30:00', 1, 3),
('2025-06-08 18:15:00', 1, 1),
('2025-05-17 09:30:00', 2, 2),
('2025-05-24 15:45:00', 2, 3),
('2025-05-31 20:00:00', 2, 1),
('2025-06-07 12:30:00', 2, 2),
('2025-06-14 17:15:00', 2, 3),
('2025-06-20 22:00:00', 2, 1),
('2025-05-19 11:00:00', 2, 2),
('2025-05-26 18:30:00', 2, 3),
('2025-06-02 14:45:00', 2, 1),
('2025-06-09 19:30:00', 2, 2),
('2025-05-18 12:15:00', 3, 3),
('2025-05-25 19:45:00', 3, 1),
('2025-06-01 16:00:00', 3, 2),
('2025-06-08 20:30:00', 3, 3),
('2025-06-15 13:00:00', 3, 1),
('2025-06-20 17:45:00', 3, 2),
('2025-05-20 13:45:00', 3, 3),
('2025-05-27 21:00:00', 3, 1),
('2025-06-03 17:30:00', 3, 2),
('2025-06-10 22:15:00', 3, 3),
('2025-05-19 14:00:00', 4, 1),
('2025-05-26 20:30:00', 4, 2),
('2025-06-02 18:45:00', 4, 3),
('2025-06-09 15:15:00', 4, 1),
('2025-06-16 20:00:00', 4, 2),
('2025-06-19 12:45:00', 4, 3),
('2025-05-21 15:30:00', 4, 1),
('2025-05-28 22:00:00', 4, 2),
('2025-06-04 19:15:00', 4, 3),
('2025-06-11 16:30:00', 4, 1),
('2025-05-20 16:45:00', 5, 2),
('2025-05-27 13:15:00', 5, 3),
('2025-06-03 20:45:00', 5, 1),
('2025-06-10 17:00:00', 5, 2),
('2025-06-17 21:30:00', 5, 3),
('2025-06-19 14:15:00', 5, 1),
('2025-05-22 18:00:00', 5, 2),
('2025-05-29 14:30:00', 5, 3),
('2025-06-05 22:00:00', 5, 1),
('2025-06-12 18:30:00', 5, 2),
('2025-05-21 19:15:00', 6, 3),
('2025-05-28 15:45:00', 6, 1),
('2025-06-04 23:00:00', 6, 2),
('2025-06-11 19:30:00', 6, 3),
('2025-06-18 16:00:00', 6, 1),
('2025-06-20 11:30:00', 6, 2),
('2025-05-23 20:30:00', 6, 3),
('2025-05-30 17:00:00', 6, 1),
('2025-06-06 13:30:00', 6, 2),
('2025-06-13 20:00:00', 6, 3),
('2025-05-22 21:45:00', 7, 1),
('2025-05-29 18:15:00', 7, 2),
('2025-06-05 15:00:00', 7, 3),
('2025-06-12 21:30:00', 7, 1),
('2025-06-19 18:00:00', 7, 2),
('2025-05-16 10:00:00', 7, 3),
('2025-05-24 23:00:00', 7, 1),
('2025-05-31 19:30:00', 7, 2),
('2025-06-07 16:00:00', 7, 3),
('2025-06-14 22:30:00', 7, 1),
('2025-05-23 10:30:00', 8, 2),
('2025-05-30 16:45:00', 8, 3),
('2025-06-06 21:00:00', 8, 1),
('2025-06-13 17:30:00', 8, 2),
('2025-06-20 22:00:00', 8, 3),
('2025-05-17 11:45:00', 8, 1),
('2025-05-25 13:00:00', 8, 2),
('2025-06-01 20:15:00', 8, 3),
('2025-06-08 16:45:00', 8, 1),
('2025-06-15 23:00:00', 8, 2),
('2025-05-24 12:00:00', 9, 3),
('2025-05-31 18:30:00', 9, 1),
('2025-06-07 22:45:00', 9, 2),
('2025-06-14 19:15:00', 9, 3),
('2025-06-17 10:00:00', 9, 1),
('2025-05-18 13:15:00', 9, 2),
('2025-05-26 14:30:00', 9, 3),
('2025-06-02 21:45:00', 9, 1),
('2025-06-09 18:15:00', 9, 2),
('2025-06-16 23:30:00', 9, 3),
('2025-05-25 14:30:00', 10, 1),
('2025-06-01 21:00:00', 10, 2),
('2025-06-08 17:30:00', 10, 3),
('2025-06-15 12:00:00', 10, 1),
('2025-06-18 13:15:00', 10, 2),
('2025-05-19 15:45:00', 10, 3),
('2025-05-27 23:00:00', 10, 1),
('2025-06-03 19:30:00', 10, 2),
('2025-06-10 16:00:00', 10, 3),
('2025-06-17 20:30:00', 10, 1),
('2025-05-26 16:00:00', 11, 2),
('2025-06-02 22:30:00', 11, 3),
('2025-06-09 19:00:00', 11, 1),
('2025-06-16 13:30:00', 11, 2),
('2025-06-19 15:00:00', 11, 3),
('2025-05-20 17:15:00', 11, 1),
('2025-05-28 13:45:00', 11, 2),
('2025-06-04 21:15:00', 11, 3),
('2025-06-11 17:45:00', 11, 1),
('2025-06-18 22:00:00', 11, 2),
('2025-05-27 18:30:00', 12, 3),
('2025-06-03 15:00:00', 12, 1),
('2025-06-10 21:30:00', 12, 2),
('2025-06-17 18:00:00', 12, 3),
('2025-06-20 10:30:00', 12, 1),
('2025-05-21 19:45:00', 12, 2),
('2025-05-29 16:15:00', 12, 3),
('2025-06-05 23:30:00', 12, 1),
('2025-06-12 20:00:00', 12, 2),
('2025-06-19 16:30:00', 12, 3),
('2025-05-28 21:00:00', 13, 1),
('2025-06-04 17:30:00', 13, 2),
('2025-06-11 14:00:00', 13, 3),
('2025-06-18 20:30:00', 13, 1),
('2025-05-16 12:00:00', 13, 2),
('2025-05-22 23:00:00', 13, 3),
('2025-05-30 19:30:00', 13, 1),
('2025-06-06 16:00:00', 13, 2),
('2025-06-13 22:30:00', 13, 3),
('2025-06-20 19:00:00', 13, 1),
('2025-05-29 22:15:00', 14, 2),
('2025-06-05 18:45:00', 14, 3),
('2025-06-12 15:15:00', 14, 1),
('2025-06-19 21:45:00', 14, 2),
('2025-05-17 13:30:00', 14, 3),
('2025-05-23 20:45:00', 14, 1),
('2025-05-31 17:15:00', 14, 2),
('2025-06-07 23:30:00', 14, 3),
('2025-06-14 20:00:00', 14, 1),
('2025-06-17 11:15:00', 14, 2),
('2025-05-30 13:00:00', 15, 3);



-- Roles beszúrása
INSERT INTO Roles (PermaId, RoleName) VALUES
('1', 'Adminisztrátor'),
('2', 'Regisztrált felhasználó');

-- Users beszúrása
INSERT INTO Users (Username, PasswordHash, Name, Email, Phone, RoleId) VALUES
('admin', 'Cisco12345', 'Admin Felhasználó', 'admin@example.com', '123456789', 1),
('user01', 'class12345', 'Példa1', 'bela@example.com', '123456779', 2),
('user02', 'class12345', 'Másik példa', 'anna@example.com', '123456788', 2);


--Ticket beszúrás
INSERT INTO Tickets (DateOfPurchase, Price, TicketVerified, UserId, ScreeningId) VALUES
('2025-09-03 10:00:00', 2500, false, 1, 3),    -- 1
('2025-09-03 11:00:00', 2500, true, 2, 5),     -- 2
('2025-09-03 12:00:00', 2500, false, 3, 7),    -- 3
('2025-09-03 13:00:00', 2500, true, NULL, 9),  -- 5
('2025-09-03 14:00:00', 2500, false, 1, 11),   -- 7
('2025-09-03 15:00:00', 2500, true, 2, 13),    -- 8
('2025-09-03 16:00:00', 2500, false, 3, 15),   -- 9
('2025-09-03 17:00:00', 2500, true, NULL, 17), -- 11
('2025-09-03 18:00:00', 2500, false, 1, 19),   -- 12
('2025-09-03 19:00:00', 2500, true, 2, 21),    -- 13
('2025-09-03 20:00:00', 2500, false, 3, 23),   -- 14
('2025-09-03 21:00:00', 2500, true, NULL, 25), -- 15
('2025-09-03 22:00:00', 2500, false, 1, 27),   -- 16
('2025-09-03 23:00:00', 2500, true, 2, 29),    -- 18
('2025-09-04 00:00:00', 2500, false, 3, 1),    -- 19
('2025-09-04 01:00:00', 2500, true, NULL, 2),  -- 21
('2025-09-04 02:00:00', 2500, false, 1, 4),    -- 23
('2025-09-04 03:00:00', 2500, true, 2, 6),     -- 24
('2025-09-04 04:00:00', 2500, false, 3, 8),    -- 25
('2025-09-04 05:00:00', 2500, true, NULL, 10), -- 26
('2025-09-04 06:00:00', 2500, false, 1, 12),   -- 27
('2025-09-04 07:00:00', 2500, true, 2, 14),    -- 28
('2025-09-04 08:00:00', 2500, false, 3, 16),   -- 29
('2025-09-04 09:00:00', 2500, true, NULL, 18), -- 30
('2025-09-04 10:00:00', 2500, false, 1, 20),   -- 31
('2025-09-04 11:00:00', 2500, true, 2, 22),    -- 32
('2025-09-04 12:00:00', 2500, false, 3, 24),   -- 33
('2025-09-04 13:00:00', 2500, true, NULL, 26), -- 34
('2025-09-04 14:00:00', 2500, false, 1, 28),   -- 35
('2025-09-04 15:00:00', 2500, true, 2, 30),    -- 36
('2025-09-04 16:00:00', 2500, false, 3, 1),    -- 37
('2025-09-04 17:00:00', 2500, true, NULL, 3),  -- 39
('2025-09-04 18:00:00', 2500, false, 1, 5);    -- 40

-- chair beszúrás
INSERT INTO Chairs (RoomId, IsReserved, TicketId) VALUES
(1, true, 16),
(1, true, 9),
(1, true, 18),
(1, true, 13),
(1, true, 36),
(1, true, 13),
(1, true, 3),
(1, true, 8),
(1, true, 32),
(1, true, 33),
(1, true, 12),
(1, true, 37),
(1, true, 30),
(1, true, 40),
(1, true, 9),
(1, true, 11),
(2, true, 34),
(2, true, 31),
(2, true, 1),
(2, true, 25),
(2, true, 39),
(2, true, 26),
(2, true, 28),
(2, true, 21),
(2, true, 37),
(2, true, 27),
(2, true, 25),
(2, true, 14),
(2, true, 19),
(2, true, 7),
(2, true, 29),
(2, true, 8),
(2, true, 18),
(3, true, 19),
(3, true, 2),
(3, true, 2),
(3, true, 2),
(3, true, 25),
(3, true, 14),
(3, true, 1),
(3, true, 13),
(3, true, 2),
(3, true, 13),
(3, true, 40),
(3, true, 2),
(3, true, 13),
(3, true, 30),
(3, true, 7),
(3, true, 8),
(3, true, 18),
(4, true, 8),
(4, true, 15),
(4, true, 29),
(4, true, 14),
(4, true, 16),
(4, true, 35),
(4, true, 3),
(4, true, 5),
(4, true, 18),
(4, true, 12),
(4, true, 3),
(4, true, 2),
(4, true, 16),
(4, true, 2),
(4, true, 24),
(4, true, 23);

-- Lekérdezés
SELECT * FROM Screenings;
Select * from Roles
Select * from users
Select * from Rooms
select * from Movies