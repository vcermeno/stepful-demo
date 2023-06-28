Get Started:
1. docker-compose up

In another terminal:
1. npx prisma migrate dev
2. npm run dev


Steps to see Functionality:
1. Go to http://localhost:3000/coach/calendar
2. Choose a Date/Time, preferable 3-5 min into future
3. See upcoming availability on calendar as coach
3. Go to http://localhost:3000/student/schedule
4. Book time you created earlier
5. Go back to http://localhost:3000/coach/calendar and see currently booked by to indicate it's been booked
6. Wait until start time has passed to view the past section
7. Add notes and satisfaction score (1 -5)