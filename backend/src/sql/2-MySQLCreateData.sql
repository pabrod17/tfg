-- ----------------------------------------------------------------------------
-- Put here INSERT statements for inserting data required by the application
-- in the "pa-project" database.
-------------------------------------------------------------------------------
INSERT INTO Season (startDate, endDate, Calendario) VALUES ('2012-01-01', '2014-01-01', 'Calendario1');
INSERT INTO Season (startDate, endDate, Calendario) VALUES ('2015-01-01', '2017-01-01', 'Calendario2');
INSERT INTO Season (startDate, endDate, Calendario) VALUES ('2018-01-01', '2020-01-01', 'Calendario3');

INSERT INTO Team (teamName) VALUES ('PRIMERO');
INSERT INTO Team (teamName) VALUES ('SEGUNDO');
INSERT INTO Team (teamName) VALUES ('TERCERO');
INSERT INTO Team (teamName) VALUES ('CUARTO');
INSERT INTO Team (teamName) VALUES ('QUINTO');
INSERT INTO Team (teamName) VALUES ('SEXTO');

INSERT INTO Lesion (lesionName, description, medication, lesionType) VALUES ('Contusion','They are produced by a blow to the muscle and can cause inflammation, pain and bruising.', 'Local cold and repose.', 1);
INSERT INTO PlayerLesion (lesionId) VALUES (1);
INSERT INTO Lesion (lesionName, description, medication, lesionType) VALUES ('Cramp','In this case, the sudden contraction of the muscle is maintained over time, causing pain and limiting movement.', 'Analgesic, stretching and massage.', 1);
INSERT INTO PlayerLesion (lesionId) VALUES (2);
INSERT INTO Lesion (lesionName, description, medication, lesionType) VALUES ('Distension','It is also called hyperextension or muscle elongation. It is generated when the muscle is stretched more than it can cover. It causes a diffuse pain that lasts over time.', 'Analgesic, repose and ice in the area.', 1);
INSERT INTO PlayerLesion (lesionId) VALUES (3);
INSERT INTO Lesion (lesionName, description, medication, lesionType) VALUES ('Fibrillar or Muscle tear','One or more fibers of muscle tissue are broken and its severity depends on the extent of the injury and its duration. The pain is sharp and very localized, although the most severe ones cause immediate immobility of the muscle.', 'Cold application in the first phase, massage, red clay and minimum rest 15 days ', 1);
INSERT INTO PlayerLesion (lesionId) VALUES (4);
INSERT INTO Lesion (lesionName, description, medication, lesionType) VALUES ('Complete muscle tear','The muscle breaks completely. The pain is intense and the inability to move the muscle is felt, causing immobility.', 'Rest is the best way to recover from a muscle tear. In addition, when suffering the tear, the patient must apply cold to the affected area (ice or a cold compress, for 10 or 15 minutes). You can then place a compression bandage around the muscle for 20 minutes. After this time, you must remove it for five minutes and then replace it. After the third or fourth day, thermotherapy can also be applied to increase the metabolism of the affected muscle.', 1);
INSERT INTO PlayerLesion (lesionId) VALUES (5);

INSERT INTO Lesion (lesionName, description, medication, lesionType) VALUES ('Enthesitis','It is characterized by inflammation of the tendon attachments to the bone due to fibrillar micro-tears caused by overload. In a high percentage of cases it is a recurrent injury.', 'Rest of the injured region and use of medications with anti-inflammatory properties, such as aspirin and ibuprofen, to relieve pain. Mild stretching exercises can also be performed, under the guidance of the physiotherapist or traumatologist, with the aim of reducing the pressure in the area a little.', 2);
INSERT INTO PlayerLesion (lesionId) VALUES (6);
INSERT INTO Lesion (lesionName, description, medication, lesionType) VALUES ('Tendinitis','In this case, the body of the tendon is generally inflamed, although it can also affect the sheath (tenosynovitis) or the peritendon (peritendinitis).', 'To relieve pain and reduce inflammation. It is usually medicated with drugs such as painkillers, corticosteroids, or platelet-rich plasma. In addition to physical therapy to stretch and strengthen the affected muscle and tendon', 2);
INSERT INTO PlayerLesion (lesionId) VALUES (7);
INSERT INTO Lesion (lesionName, description, medication, lesionType) VALUES ('Partial break','It usually occurs especially in the longer tendons and is characterized by the breakage of a few fibers.', 'Keep the tendon at rest using crutches. Ice the area. Take over-the-counter pain relievers. Keeping the ankle at rest for the first few weeks, usually in a walking boot with wedge heels or a cast, or with the foot flexed downward.', 2);
INSERT INTO PlayerLesion (lesionId) VALUES (8);
INSERT INTO Lesion (lesionName, description, medication, lesionType) VALUES ('Total break','The tendon is completely ruptured and usually occurs in older athletes.', 'Keep the tendon at rest using crutches. Ice the area. Take over-the-counter pain relievers. Keeping the ankle at rest for the first few weeks, usually in a walking boot with wedge heels or a cast, or with the foot flexed downward.', 2);
INSERT INTO PlayerLesion (lesionId) VALUES (9);
INSERT INTO Lesion (lesionName, description, medication, lesionType) VALUES ('Dislocation','The tendon is displaced from its natural position when performing certain movements. It is a very rare injury.', 'Rest the dislocated joint. Do not repeat the action that caused your injury and try to avoid painful movements.Apply ice and heat. Take an analgesic. Maintain the joint''s range of motion.', 2);
INSERT INTO PlayerLesion (lesionId) VALUES (10);

INSERT INTO Lesion (lesionName, description, medication, lesionType) VALUES ('Bone','Bone joint injuries can be fractures, with partial or total breakage of the bone, and dislocations, which cause one of the bones that make up the joint to come out of its normal position.', 'Treatment of any serious complication. Pain relief. Protection, Rest, Ice, Compression and Elevation. Realignment (reduction) of fragments that are out of place. Immobilization, usually with a splint or cast. On certain occasions, surgical intervention', 3);
INSERT INTO PlayerLesion (lesionId) VALUES (11);
INSERT INTO Lesion (lesionName, description, medication, lesionType) VALUES ('Cartilage','They cover the end of the bone and make the joint work properly, preventing friction between the bones (the menisci are cartilage). Among the most frequent injuries caused by sport, we must highlight chondromolacia, which implies the alteration of the cartilage generally as a consequence of trauma, and osteochondritis, which is the inflammation of the cartilage.', 'Treatment for chondromalacia patellae can be done with physical therapy, with the aim of improving the position of the patella and the function of the knee, in addition to the use of anti-inflammatory and analgesic medications to control inflammation and pain, which should be prescribed by the doctor and used as directed.', 3);
INSERT INTO PlayerLesion (lesionId) VALUES (12);
INSERT INTO Lesion (lesionName, description, medication, lesionType) VALUES ('Synovial membrane','It is a membrane that covers the entire joint to protect it and is filled with synovial fluid. The most common injury is synovitis, that is, an irritation of the inflammation of the membrane due to a blow, a twist of the joint or poor posture, which causes an increase in the volume of synovial fluid.', 'Usually it will begin with the application of cold and heat, rest and the taking of anti-inflammatories or even injected corticosteroids. It generally includes taking anti-inflammatories, in some cases corticosteroid injections, the application of heat and cold, and rest. Electrostimulation can also be a good complement, especially if combined with the application of ice to the knee, since it facilitates the relaxation of the muscles and helps to reduce both pain and inflammation.', 3);
INSERT INTO PlayerLesion (lesionId) VALUES (13);
INSERT INTO Lesion (lesionName, description, medication, lesionType) VALUES ('Stock exchanges','They are soft sac-like structures found between the muscles, tendons, ligaments and bony prominences that make up the joint and whose function is to avoid friction of the bones during movement and cushion the pressure exerted on the joint . The most common injury is bursitis, that is, an inflammation of the bursa, which can become chronic after successive episodes. It can be caused by bruising, repetitive motion, and continued pressure on it.', 'Applying ice to the affected joint three or four times a day for the first few days. Joint compression. Do not lie down putting weight on the affected joint. Taking anti-inflammatories. Avoid overexertion and, if possible, the use of the joint.', 3);
INSERT INTO PlayerLesion (lesionId) VALUES (14);

INSERT INTO Lesion (lesionName, description, medication, lesionType) VALUES ('Hyperkyphosis','It is an increase in the curvature of the dorsal area.', 'Medicines. Treatment of osteoporosis associated with hyperkyphosis with antiresorptive or bone-building drugs is common. Surgery. Functional braces and bandages: Corsets and other spinal orthoses have been used to try to reduce the kyphotic curve. Exercise.', 4);
INSERT INTO PlayerLesion (lesionId) VALUES (15);
INSERT INTO Lesion (lesionName, description, medication, lesionType) VALUES ('Hyperlordosis','In this case, the curvature of the lumbar area of ​​the spine increases.', 'Physiotherapy sessions and with the practice of physical exercises such as swimming or Pilates. In physiotherapy, various exercises should be performed that strengthen the muscles that are weakened, specifically those of the abdomen, as well as stretching of the muscles that are atrophied, stretching the spine.', 4);
INSERT INTO PlayerLesion (lesionId) VALUES (16);