const SAMPLE_DOCUMENTS: SampleDocument[] = [
  {
    name: "ACORD_001_FastTrack.txt",
    content: `AUTOMOBILE LOSS NOTICE - ACORD 2
CARRIER: SafeGuard Insurance Company
NAIC CODE: 12345
POLICY NUMBER: AUTO-2024-789456
LINE OF BUSINESS: Personal Auto
DATE OF LOSS: 12/01/2025
TIME: 02:30 PM

INSURED INFORMATION
NAME OF INSURED: John Michael Smith
INSURED'S MAILING ADDRESS: 456 Oak Avenue, Springfield, IL 62704
DATE OF BIRTH: 05/15/1980
PRIMARY PHONE: (555) 123-4567 HOME
PRIMARY E-MAIL: john.smith@email.com

AGENCY INFORMATION
AGENCY NAME: Premier Insurance Agency
AGENCY CUSTOMER ID: AG-45678
PHONE: (555) 999-8888

LOCATION OF LOSS
STREET: 123 Main Street, Parking Lot B
CITY, STATE, ZIP: Springfield, IL 62701
COUNTRY: USA

POLICE OR FIRE DEPARTMENT CONTACTED: Yes
REPORT NUMBER: SPD-2025-4567

DESCRIPTION OF ACCIDENT:
Minor fender bender in parking lot. Vehicle backed into insured's car while parking. 
No injuries reported. Driver was distracted by phone. Small dent on rear bumper, 
scratches on paint. Weather conditions were clear, dry pavement.

INSURED VEHICLE
VEH #: 1
YEAR: 2020
MAKE: Honda
MODEL: Accord
BODY TYPE: Sedan
V.I.N.: 1HGBH41JXMN109186
PLATE NUMBER: IL ABC1234 STATE: IL

OWNER'S NAME AND ADDRESS: John Michael Smith (same as insured)
DRIVER'S NAME AND ADDRESS: John Michael Smith (same as insured)
DRIVER'S LICENSE NUMBER: S123-4567-8901 STATE: IL
DATE OF BIRTH: 05/15/1980
RELATION TO INSURED: Self
PURPOSE OF USE: Personal
USED WITH PERMISSION?: Y

DESCRIBE DAMAGE: Rear bumper dent approximately 6 inches, paint scratches, 
minor damage to rear light housing
ESTIMATE AMOUNT: $3,500
WHERE CAN VEHICLE BE SEEN?: 456 Oak Avenue, Springfield, IL 62704
WHEN CAN VEHICLE BE SEEN?: Weekdays after 5 PM, weekends anytime

OTHER VEHICLE / PROPERTY DAMAGED
VEH #: 2
YEAR: 2019
MAKE: Toyota
MODEL: RAV4
BODY TYPE: SUV
PLATE NUMBER: IL XYZ9876 STATE: IL
V.I.N.: 2T3WFREV5KW123456

DRIVER'S NAME AND ADDRESS: Jane Elizabeth Doe
Address: 789 Elm Street, Springfield, IL 62702
PRIMARY PHONE: (555) 987-6543 CELL
PRIMARY E-MAIL: jane.doe@email.com

OWNER'S NAME AND ADDRESS: Jane Elizabeth Doe (same as driver)

DESCRIBE DAMAGE: Minor front bumper scratches
ESTIMATE AMOUNT: $800
OTHER VEH/PROP INS?: Y
CARRIER OR AGENCY NAME: Metro Insurance Group
POLICY NUMBER: MTR-2024-556677

WITNESSES OR PASSENGERS:
NAME & ADDRESS: Robert Williams, 321 Pine Street, Springfield, IL 62703
PHONE: (555) 444-5555
VEH: OTH VEH

INJURED: None

REMARKS: All parties cooperative. Photos taken at scene. No dispute on fault. 
Other driver accepted responsibility.

OTHER INSURANCE ON VEHICLE - CARRIER: None

REPORTED BY: John Michael Smith
REPORTED TO: SafeGuard Insurance Claims Department`,
  },
  {
    name: "ACORD_002_MissingFields.txt",
    content: `AUTOMOBILE LOSS NOTICE - ACORD 2
CARRIER: Reliable Auto Insurance
POLICY NUMBER: AUTO-2024-334455
LINE OF BUSINESS: Personal Auto
DATE OF LOSS: 11/28/2025

INSURED INFORMATION
NAME OF INSURED: Sarah Marie Johnson
INSURED'S MAILING ADDRESS: 789 Maple Drive, Chicago, IL 60601
PRIMARY E-MAIL: sarah.j@email.com

LOCATION OF LOSS
CITY, STATE, ZIP: Chicago, IL 60602
COUNTRY: USA

DESCRIPTION OF ACCIDENT:
Slip and fall incident occurred at grocery store. Customer slipped on wet floor 
without proper warning signage. Resulted in injury to back and hip area.

INSURED VEHICLE
YEAR: 2021
MAKE: Ford
MODEL: Explorer

INJURED:
NAME & ADDRESS: Sarah Marie Johnson
EXTENT OF INJURY: Back pain, hip contusion, possible soft tissue damage

REMARKS: Medical treatment sought at emergency room. X-rays performed. 
No fractures found but significant bruising and pain.`,
  },
  {
    name: "ACORD_003_Fraud_Flag.txt",
    content: `AUTOMOBILE LOSS NOTICE - ACORD 2
CARRIER: National Auto Coverage Inc.
NAIC CODE: 98765
POLICY NUMBER: AUTO-2024-998877
LINE OF BUSINESS: Personal Auto
DATE OF LOSS: 12/05/2025
TIME: 11:45 PM

INSURED INFORMATION
NAME OF INSURED: Michael Robert Thompson
INSURED'S MAILING ADDRESS: 234 County Road 45, Rural Area, TX 75001
DATE OF BIRTH: 03/22/1985
PRIMARY PHONE: (555) 444-8888 CELL
PRIMARY E-MAIL: mike.t@email.com

LOCATION OF LOSS
STREET: Highway 287, Mile Marker 45
CITY, STATE, ZIP: Remote Location, TX 75002
COUNTRY: USA

POLICE OR FIRE DEPARTMENT CONTACTED: No
REPORT NUMBER: None

DESCRIPTION OF ACCIDENT:
Single vehicle collision with guard rail on remote highway. Driver claims deer ran 
into road causing swerve. However, no deer evidence found. Story has changed 
multiple times during initial report. Damage pattern appears inconsistent with 
described collision. Vehicle damage seems staged. Witness accounts conflict with 
driver's version. Investigation needed due to fraud indicators.

INSURED VEHICLE
VEH #: 1
YEAR: 2019
MAKE: Toyota
MODEL: Camry
BODY TYPE: Sedan
V.I.N.: 2HGFC2F59KH543210
PLATE NUMBER: TX DEF5678 STATE: TX

OWNER'S NAME AND ADDRESS: Michael Robert Thompson (same as insured)
DRIVER'S NAME AND ADDRESS: Michael Robert Thompson (same as insured)
DRIVER'S LICENSE NUMBER: T987-6543-2101 STATE: TX
DATE OF BIRTH: 03/22/1985
RELATION TO INSURED: Self

DESCRIBE DAMAGE: Major front end damage, hood crushed, both headlights destroyed, 
front bumper separated, radiator damaged, possible frame damage
ESTIMATE AMOUNT: $45,000

WITNESSES OR PASSENGERS: None available

INJURED: None claimed

REMARKS: Inconsistent timeline provided. Vehicle recently increased coverage amount 
three weeks prior to incident. No police report filed despite severity. 
Photos show damage inconsistent with guard rail impact.

REPORTED BY: Michael Robert Thompson
REPORTED TO: National Auto Coverage Claims`,
  },
  {
    name: "ACORD_004_Injury_Specialist.txt",
    content: `AUTOMOBILE LOSS NOTICE - ACORD 2
CARRIER: Premier Auto Insurance Company
NAIC CODE: 45678
POLICY NUMBER: AUTO-2024-112233
LINE OF BUSINESS: Personal Auto
DATE OF LOSS: 12/07/2025
TIME: 09:15 AM

INSURED INFORMATION
NAME OF INSURED: Emily Ann Davis
INSURED'S MAILING ADDRESS: 567 Commonwealth Ave, Boston, MA 02101
DATE OF BIRTH: 08/12/1988
PRIMARY PHONE: (555) 222-3333 HOME
SECONDARY PHONE: (555) 222-4444 CELL
PRIMARY E-MAIL: emily.davis@email.com

AGENCY INFORMATION
AGENCY NAME: Boston Insurance Partners
AGENCY CUSTOMER ID: AG-78901
PHONE: (555) 888-7777

LOCATION OF LOSS
STREET: Intersection of Commonwealth Ave and Beacon Street
CITY, STATE, ZIP: Boston, MA 02101
COUNTRY: USA

POLICE OR FIRE DEPARTMENT CONTACTED: Yes
REPORT NUMBER: BPD-2025-8901

DESCRIPTION OF ACCIDENT:
Multi-vehicle collision at major intersection. Third party driver ran red light 
at high speed and struck insured's vehicle on driver's side. Significant impact. 
Airbags deployed on both vehicles. Driver experienced immediate neck and back pain. 
Complained of headache and dizziness. Transported to Massachusetts General Hospital 
by ambulance. Initial diagnosis: cervical strain, possible concussion, lumbar contusion. 
Currently undergoing evaluation. Other occupant (passenger) also injured.

INSURED VEHICLE
VEH #: 1
YEAR: 2017
MAKE: Tesla
MODEL: Model S
BODY TYPE: Sedan
V.I.N.: 5YJSA1E26HF123456
PLATE NUMBER: MA ABC789 STATE: MA

OWNER'S NAME AND ADDRESS: Emily Ann Davis (same as insured)
DRIVER'S NAME AND ADDRESS: Emily Ann Davis (same as insured)
DRIVER'S LICENSE NUMBER: D123456789 STATE: MA
DATE OF BIRTH: 08/12/1988
RELATION TO INSURED: Self
PURPOSE OF USE: Commuting to work
USED WITH PERMISSION?: Y

DESCRIBE DAMAGE: Driver side door crushed, B-pillar bent, side airbags deployed, 
front airbags deployed, possible frame damage, side mirror destroyed, 
windows shattered, front quarter panel damaged
ESTIMATE AMOUNT: $18,500
WHERE CAN VEHICLE BE SEEN?: Boston Auto Towing, 789 Industrial Blvd, Boston, MA
WHEN CAN VEHICLE BE SEEN?: Business hours, Monday-Friday

OTHER VEHICLE / PROPERTY DAMAGED
VEH #: 2
YEAR: 2020
MAKE: Ford
MODEL: F-150
BODY TYPE: Pickup
PLATE NUMBER: MA XYZ456 STATE: MA
V.I.N.: 1FTFW1E89LKE12345

DRIVER'S NAME AND ADDRESS: Robert James Williams
Address: 890 Harbor Street, Boston, MA 02102
PRIMARY PHONE: (555) 666-7777 CELL

OWNER'S NAME AND ADDRESS: Robert James Williams (same as driver)

DESCRIBE DAMAGE: Front bumper, hood, front right fender
ESTIMATE AMOUNT: $8,200
OTHER VEH/PROP INS?: Y
CARRIER OR AGENCY NAME: ABC Insurance Company
POLICY NUMBER: ABC-2024-667788

WITNESSES OR PASSENGERS:
NAME & ADDRESS: Jennifer Martinez (Passenger in insured vehicle)
Address: 234 Newbury Street, Boston, MA 02101
PHONE: (555) 333-4444
EXTENT OF INJURY: Shoulder injury, bruising, minor cuts from glass
VEH: INS VEH

NAME & ADDRESS: Thomas Chen (Witness - pedestrian)
Address: 456 Boylston Street, Boston, MA 02101
PHONE: (555) 777-8888
VEH: PED

INJURED:
1. Emily Ann Davis - Driver - Neck strain, back pain, possible concussion, dizziness
2. Jennifer Martinez - Passenger - Shoulder injury, bruising, lacerations

REMARKS: Both insured and passenger transported by ambulance. Medical records 
being obtained. Police report indicates other driver at fault - ran red light. 
Traffic camera footage available. Witness confirms other driver's fault. 
Vehicle likely totaled due to frame damage and airbag deployment.

OTHER INSURANCE ON VEHICLE - CARRIER: None

REPORTED BY: Emily Ann Davis
REPORTED TO: Premier Auto Insurance Claims Department`,
  },
  {
    name: "ACORD_005_High_Value.txt",
    content: `AUTOMOBILE LOSS NOTICE - ACORD 2
CARRIER: Executive Auto Insurance Corp
NAIC CODE: 23456
POLICY NUMBER: AUTO-2024-445566
LINE OF BUSINESS: Commercial Auto
DATE OF LOSS: 12/08/2025
TIME: 04:00 PM

INSURED INFORMATION
NAME OF INSURED: David Lee (Business Owner)
INSURED'S MAILING ADDRESS: 789 Business Park Drive, Austin, TX 78701
DATE OF BIRTH: 06/20/1975
PRIMARY PHONE: (555) 111-2222 BUS
SECONDARY PHONE: (555) 111-3333 CELL
PRIMARY E-MAIL: david.lee@businesscorp.com

AGENCY INFORMATION
AGENCY NAME: Corporate Insurance Solutions
AGENCY CUSTOMER ID: AG-99887
PHONE: (555) 777-6666

LOCATION OF LOSS
STREET: 789 Business Park Drive (Company Parking Lot)
CITY, STATE, ZIP: Austin, TX 78701
COUNTRY: USA

POLICE OR FIRE DEPARTMENT CONTACTED: Yes
REPORT NUMBER: APD-2025-7890

DESCRIPTION OF ACCIDENT:
Severe hailstorm caused extensive damage to company vehicle fleet. Multiple vehicles 
damaged by large hail (2-3 inch diameter). Vehicle windows shattered, body panels 
dented, paint damaged. Total of 5 company vehicles affected. Storm lasted 
approximately 20 minutes. Weather service confirmed severe hail event. 
Comprehensive coverage claim for fleet damage.

INSURED VEHICLE
VEH #: 1
YEAR: 2023
MAKE: Mercedes-Benz
MODEL: Sprinter Van
BODY TYPE: Commercial Van
V.I.N.: WD3PE8CC5N9123456
PLATE NUMBER: TX BUS123 STATE: TX

OWNER'S NAME AND ADDRESS: BusinessCorp LLC
Address: 789 Business Park Drive, Austin, TX 78701
PRIMARY PHONE: (555) 111-2222 BUS

DRIVER'S NAME AND ADDRESS: Not applicable - parked
RELATION TO INSURED: Company fleet vehicle

DESCRIBE DAMAGE: Windshield shattered, all side windows cracked, roof severely 
dented (50+ dents), hood dented (30+ dents), side panels dented throughout, 
paint chipped in multiple locations. Estimated total loss potential.
ESTIMATE AMOUNT: $28,000 per vehicle x 5 vehicles = $140,000 total claim
WHERE CAN VEHICLE BE SEEN?: 789 Business Park Drive, Austin, TX 78701
WHEN CAN VEHICLE BE SEEN?: Business hours, Monday-Friday 8 AM - 6 PM

REMARKS: This claim covers 5 commercial vehicles damaged in same incident:
Vehicle 1: 2023 Mercedes Sprinter Van - VIN WD3PE8CC5N9123456 - Est. $28,000
Vehicle 2: 2023 Mercedes Sprinter Van - VIN WD3PE8CC5N9234567 - Est. $27,500
Vehicle 3: 2022 Ford Transit Van - VIN 1FTBW2XG8NKA45678 - Est. $25,000
Vehicle 4: 2022 Ford Transit Van - VIN 1FTBW2XG8NKA56789 - Est. $24,000
Vehicle 5: 2024 Ram ProMaster - VIN 3C6TRVDG3RE123456 - Est. $35,500

Total estimated damage: $140,000

Weather documentation provided. Photos of all damaged vehicles attached. 
National Weather Service report confirms severe hail event. Multiple claims 
expected in area from same storm. All vehicles maintained according to schedule. 
No previous damage to any vehicles.

OTHER INSURANCE ON VEHICLE - CARRIER: None
POLICY NUMBER: AUTO-2024-445566 covers all 5 vehicles

REPORTED BY: David Lee, Fleet Manager
REPORTED TO: Executive Auto Insurance Claims Department`,
  },
];

export default SAMPLE_DOCUMENTS;
