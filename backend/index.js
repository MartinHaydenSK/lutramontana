//Modules
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const cors = require("cors");
const { format } = require("date-fns");
const { v4: uuidv4 } = require("uuid");
//Databases
const ReservationTable = require("./databeses/reservations");
const DeletedReservationsTable = require("./databeses/deletedReservations");
const ReviewsTable = require("./databeses/reviews");
//Variables
const app = express();
const port = process.env.PORT || 3000;
const adminEmail = "martinhayden303@gmail.com";
const dbPrefix =
  "mongodb+srv://MartinHayden:nt2f73NNQH119I1o@cluster0.ar6z1.mongodb.net/chata_web";
const linkToBackend = "https://lutramontana-backend.vercel.app";
const linkToFrontend = "https://lutramontana-frontend.vercel.app";
app.use(express.json());
app.use(
  cors({
    origin: "https://lutramontana-frontend.vercel.app", // Povolenie len pre frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);
//Transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: adminEmail,
    pass: "ajkj zyhm twbo mgfr",
  },
});
//Email variabels
const sendEmail = (from, to, subject, message) => {
  const sendEmail = transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    html: message,
  });
};

const headerForEmails = `
<table  style="width: 100%; background-color: #A0522D;  ">
<tr>
<td align="left">
  <img src="https://drive.google.com/uc?export=view&id=16kiBf8OV0XCOqXovKz89hrPApuUT_5cG" alt="Logo" style="max-width: 100px; " />
</td>
</tr>
</table>
`;
const footerForEmails = `
<table  style="width: 100% ; background-color: #A0522D; ">
<tr>
<h2 style="color: white"><strong>Kontakt</strong></h2>
</tr>
<tr>
<td align="left">
<p style="color: white"><strong>Email:</strong> ${adminEmail}</p>
</td>
<td align="right">
<p style="color: white"><strong>Telefonné číslo:</strong> ${adminEmail}</p>
</td>
</tr>
</table>
`;
// Starting app
const connectToDatabase = () => {
  try {
    mongoose.connect(dbPrefix);

    app.listen(port, () => {
      console.log("successfully connected to database");
    });
  } catch (error) {
    console.log(error.message);
  }
};
connectToDatabase();

//Methods post
// app.post("/send-email", async (req, res) => {
//   const {
//     dateStart,
//     dateEnd,
//     numberOfGuests,
//     name,
//     surname,
//     email,
//     phonenumber,
//     street,
//     town,
//     psc,
//     additionalNeeds,
//   } = req.body;

//   const reservationId = uuidv4();
//   const reservationMessage = `

// <div style="font-family: Arial, sans-serif;background-color: #FFE4C4; width: 100%;">
//  ${headerForEmails}
//   <div style="padding: 20px;">
//   <h2>Vážený/á ${name} ${surname}</h2>
//   <p style="max-width: 700px;">
//   Prosím skontrolujte zadané údaje či sú vporiadku. V prípade že všetky údaje sú vporiadku tak kliknite na tlačidlo "Záväzne rezervovať pobyt". Po stlačení tlačidla vám príde email ktorý je len informačný a je potvrdením o rezervácii.<strong>V prípade že sú niektoré údaje zle zadané môžete sa vráiť na stránku, opraviť ich a znova poslať email</strong>
//   </p>
//   <div>
//     <div>
//       <h3>Detaily rezervácie</h3>
//       <p><strong>Dátum začiatku pobytu:</strong> ${format(
//         dateStart,
//         "dd.MM.yyyy"
//       )}</p>
//       <p><strong>Dátum ukončenia pobytu:</strong> ${format(
//         dateEnd,
//         "dd.MM.yyyy"
//       )}</p>
//       <p><strong>Počet hostí:</strong> ${numberOfGuests}</p>
//     </div>
//     <div>
//       <h3>Kontaktné údaje</h3>
//       <p><strong>Meno:</strong> ${name} ${surname}</p>
//       <p><strong>Email:</strong> ${email}</p>
//       <p><strong>Telefónne číslo:</strong> ${phonenumber}</p>
//     </div>
//     <div>
//       <h3>Adresa</h3>
//       <p><strong>Ulica:</strong> ${street}</p>
//       <p><strong>Mesto:</strong> ${town}</p>
//       <p><strong>PSČ:</strong> ${psc}</p>
//     </div>
//     <div>
//       <h3>Ďalšie požiadavky</h3>
//       <p>${additionalNeeds}</p>
//     </div>
//   </div>
//   <a href="${linkToBackend}/reservation-confirmation?reservationId=${reservationId}&dateStart=${dateStart}&dateEnd=${dateEnd}&numberOfGuests=${numberOfGuests}&name=${name}&surname=${surname}&email=${email}&phonenumber=${phonenumber}&street=${street}&town=${town}&psc=${psc}&additionalNeeds=${additionalNeeds}"
//      style="display: inline-block; color: rgb(0, 0, 0); background-color:rgb(255, 255, 255); text-decoration: none; padding: 10px 20px; text-transform: uppercase; font-weight: bold; border-radius: 5px;">
//     Záväzne zarezervovať pobyt
//   </a>
//   </div>
// </div>

// `;

//   try {
//     sendEmail(
//       adminEmail,
//       email,
//       "Záväzne rezervovať pobyt",
//       reservationMessage
//     );
//     res
//       .status(200)
//       .json(
//         "Otvorte si email, skontrolujte či všetky údaje sú vporiadku a potvrďte záväzne rezerváciu"
//       );
//   } catch (error) {
//     res.status(400).json(error.message);
//   }
// });

app.get("/", (req, res) => {
  res.send("hello world");
});
//Methods get
app.post("/reservation-confirmation", async (req, res) => {
  const {
    dateStart,
    dateEnd,
    numberOfGuests,
    name,
    surname,
    email,
    phonenumber,
    street,
    town,
    psc,
    additionalNeeds,
  } = req.body;
  const reservationId = uuidv4();

  const reservationMessage = `
  <div style="font-family: Arial, sans-serif;background-color: #FFE4C4; width: 100%;">
 ${headerForEmails}
  <div style="padding: 20px;">
<h2>Vytvorenie rezervácie na chate Lutra Montana</h2>
<p>
    Tento e-mail slúži ako informačné potvrdenie o vytvorení rezervácie na stránke 
    <strong>lutramontana.sk</strong>. Ak ste rezerváciu nevytvorili priamo cez našu stránku, ale cez 
    Booking.com, znamená to, že majiteľ iba manuálne zadal vašu rezerváciu do nášho systému.
  </p>
  <p>
    Upozorňujeme, že rezervácia sa stáva záväznou až po uhradení zálohy. Záloha je 
    <strong>nevratná</strong> v prípade zrušenia rezervácie menej ako 
    <strong>14 dní pred začiatkom pobytu</strong>.
  </p>
  <p><strong>Údaje pre platbu zálohy:</strong></p>
  <p><strong>IBAN:</strong> SKXX XXXX XXXX XXXX XXXX XXXX</p>
  <p>Variabilný symbol: (dátum začiatku pobytu vo formáte DDMMYYYY)</p>
  <p>
    Ak máte akékoľvek otázky, neváhajte nás kontaktovať.
  </p>
    <div>
      <div>
        <h3>Detaily rezervácie</h3>
        <p><strong>Dátum začiatku pobytu:</strong> ${format(
          dateStart,
          "dd.MM.yyyy"
        )}</p>
        <p><strong>Dátum ukončenia pobytu:</strong> ${format(
          dateEnd,
          "dd.MM.yyyy"
        )}</p>
        <p><strong>Počet hostí:</strong> ${numberOfGuests}</p>
      </div>
      <div>
        <h3>Kontaktné údaje</h3>
        <p><strong>Meno:</strong> ${name} ${surname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefónne číslo:</strong> ${phonenumber}</p>
      </div>
      <div>
        <h3>Adresa</h3>
        <p><strong>Ulica:</strong> ${street}</p>
        <p><strong>Mesto:</strong> ${town}</p>
        <p><strong>PSČ:</strong> ${psc}</p>
      </div>
      <div>
        <h3>Ďalšie požiadavky</h3>
        <p>${additionalNeeds}</p>
      </div>
      <div>
<h3>Kontakt na majitela</h3>
<p><strong>Email:</strong></p>
<p><strong>MObil:</strong></p>
      </div>
    </div>
  `;
  const reservationMessageAdmin = `
   <div style="font-family: Arial, sans-serif;background-color: #FFE4C4; width: 100%;">
 ${headerForEmails}
  <div style="padding: 20px;">
<h2>Bola vytvorená nová rezervácia</h2>
    <div>
      <div>
        <h3>Detaily rezervácie</h3>
        <p><strong>Dátum začiatku pobytu:</strong> ${format(
          dateStart,
          "dd.MM.yyyy"
        )}</p>
        <p><strong>Dátum ukončenia pobytu:</strong> ${format(
          dateEnd,
          "dd.MM.yyyy"
        )}</p>
        <p><strong>Počet hostí:</strong> ${numberOfGuests}</p>
      </div>
      <div>
        <h3>Kontaktné údaje</h3>
        <p><strong>Meno:</strong> ${name} ${surname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefónne číslo:</strong> ${phonenumber}</p>
      </div>
      <div>
        <h3>Adresa</h3>
        <p><strong>Ulica:</strong> ${street}</p>
        <p><strong>Mesto:</strong> ${town}</p>
        <p><strong>PSČ:</strong> ${psc}</p>
      </div>
      <div>
        <h3>Ďalšie požiadavky</h3>
        <p>${additionalNeeds}</p>
      </div>
    </div>
   <table  style="width: 100%;">
  <tr>
<td align="left">
 <a href="${linkToBackend}/updateReservation?reservationId=${reservationId}&dateStart=${dateStart}&dateEnd=${dateEnd}"  style="display: inline-block; background-color:rgb(20, 147, 29); color: white; text-decoration: none; padding: 10px 20px; text-transform: uppercase; font-weight: bold; border-radius: 5px;">
 Upraviť rezerváciu
    </a>
  </td>
     <td align="right"><a href="${linkToBackend}/deleteReservation/${reservationId}"  style="display: inline-block; background-color:rgb(181, 23, 12); color: white; text-decoration: none; padding: 10px 20px; text-transform: uppercase; font-weight: bold; border-radius: 5px;">
 Zrušiť rezerváciu
    </a></td>
    </tr>

 </table>
  </div>
</div>
  `;
  const parsedDateStart = new Date(dateStart);
  const parsedDateEnd = new Date(dateEnd);
  try {
    const makeNewReservation = await ReservationTable.create({
      reservationId,
      dateStart: parsedDateStart,
      dateEnd: parsedDateEnd,
      numberOfGuests,
      email,
      phonenumber,
      name,
      surname,
      street,
      town,
      psc,
      additionalNeeds,
    });
    if (makeNewReservation) {
      sendEmail(adminEmail, email, "Rezrvácia pobytu", reservationMessage);
      sendEmail(
        adminEmail,
        adminEmail,
        "Nová rezervácia pobytu",
        reservationMessageAdmin
      );
      res
        .status(200)
        .json(
          "Rezervácia bola úspešne vytvorená, skontrolujte email či vám príšlo oznámenie o vytvorení rezervácie"
        );
    }
  } catch (error) {
    console.log(error.message, "here");
  }
});

app.get("/reservations", async (req, res) => {
  try {
    const findAllReservations = await ReservationTable.find();
    if (findAllReservations) {
      res.send(findAllReservations);
    } else {
      res.send("we have database");
    }
  } catch (error) {
    console.log(error.message);
  }
});

//Method delete
app.get("/deleteReservation/:reservationId", async (req, res) => {
  const { reservationId } = req.params;

  if (reservationId) {
    try {
      const findResevation = await ReservationTable.findOne({
        reservationId,
      });
      if (findResevation) {
        await ReservationTable.findOneAndDelete({
          reservationId,
        });
        await DeletedReservationsTable.create({
          deletedReservationId: reservationId,
        });
        const deletedReservationMessage = `
      <div style="font-family: Arial, sans-serif;background-color: #FFE4C4; width: 100%;">
 ${headerForEmails}
  <div style="padding: 20px;">
<h2>Vážený/á ${findResevation.name} ${findResevation.surname},</h2>
       <p>
     na základe Vašej žiadosti sme zrušili Vašu rezerváciu na chate [Názov chaty] v termíne [Dátum].
     
     Je nám ľúto, že Vás tentokrát nebudeme môcť privítať, ale dúfame, že nás v budúcnosti opäť navštívite. Ak by ste mali akékoľvek otázky alebo by ste si chceli rezervovať nový termín, neváhajte nás kontaktovať.
     
     Ďakujeme a prajeme Vám pekný deň!</p>
  </div>
</div>  `;
        const deletedReservationMessageAdmin = `
      <div style="font-family: Arial, sans-serif;background-color: #FFE4C4; width: 100%;">
 ${headerForEmails}
  <div style="padding: 20px;">
<p>Rezervácia v dňoch medzi ${format(
          findResevation.dateStart,
          "dd.MM.yyyy"
        )} - ${format(findResevation.dateEnd, "dd.MM.yyyy")} bola zrušená</p>
      <h3><strong>Kontakt na zákazníka ${findResevation.name} ${
          findResevation.surname
        }</strong> </h3>
      <p><strong>Email:</strong> ${findResevation.email} </p>
      <p><strong>Telefonné číslo:</strong> ${findResevation.phonenumber} </p>
  </div>
</div>
    

      `;
        sendEmail(
          adminEmail,
          findResevation.email,
          "Potvrdenie zrušenia Vašej rezervácie",
          deletedReservationMessage
        );

        sendEmail(
          adminEmail,
          adminEmail,
          `Zrušenie rezervácie`,
          deletedReservationMessageAdmin
        );
        res.redirect(`${linkToFrontend}/?message=${"Rezervácia bola zrušená"}`);
      } else {
        res.redirect(`${linkToFrontend}/?message=${"Rezervácia sa nenašla"}`);
      }
    } catch (error) {
      console.log(error.message, "requres: /deleteReservation/:reservationId ");
    }
  }
});

//Method update
app.get("/updateReservation", async (req, res) => {
  try {
    const findResevation = await ReservationTable.findOne({
      reservationId: req.query.reservationId,
    });

    console.log(findResevation);
    if (findResevation) {
      res.redirect(
        `${linkToFrontend}/aktualizovanieRezervacie?reservationId=${
          findResevation.reservationId
        }&dateStart=${findResevation.dateStart}&dateEnd=${
          findResevation.dateEnd
        }&message=${"ok"}`
      );
    } else {
      res.redirect(
        `${linkToFrontend}/aktualizovanieRezervacie?message=${"Rezervácia bola zrušená, preto ju nemôžete aktualizovať"}`
      );
    }
  } catch (error) {
    console.log(error, "/updateReservation");
  }
});

app.post("/update-reservation", async (req, res) => {
  const { reservationId, dateStart, dateEnd } = req.body;

  try {
    const findResevation = await ReservationTable.findOne({ reservationId });
    console.log(findResevation.surname);
    const updatingReservation = await ReservationTable.findOneAndUpdate(
      {
        reservationId,
      },
      {
        dateStart,
        dateEnd,
      },
      { new: true }
    );
    if (!updatingReservation) {
      return res
        .status(400)
        .json("Rezervácia sa nenašla, pravdepodobne bola zmazaná");
    }
    if (findResevation && updatingReservation) {
      console.log(findResevation);
      const reservationMessage = `
        <div style="font-family: Arial, sans-serif;background-color: #FFE4C4; width: 100%;">
 ${headerForEmails}
  <div style="padding: 20px;">
  <h2>Vážený/á ${findResevation.name} ${findResevation.surname},</h2>
 <h2>Oznámanie o zmene dátumu vášho pobytu</h2>
          <p style="max-width: 700px;">
           Váš dátum rezervácie sa zmenil z <span style="text-decoration: over-line">${format(
             findResevation.dateStart,
             "dd.MM.yyyy"
           )} - ${format(
        findResevation.dateEnd,
        "dd.MM.yyyy"
      )}</span> na <strong>${format(dateStart, "dd.MM.yyyy")} - ${format(
        dateEnd,
        "dd.MM.yyyy"
      )}
          </p>
  </div>
</div>
        `;
      const reservationMessageAdmin = `
         <div style="font-family: Arial, sans-serif;background-color: #FFE4C4; width: 100%;">
 ${headerForEmails}
  <div style="padding: 20px;">
 <h2>Oznámanie o zmene dátumu pobytu osoby ${findResevation.name} ${
        findResevation.surname
      }</h2>
           <div>
      <div>
        <h3>Detaily rezervácie</h3>
        <p><strong>Bývalý dátum začiatku pobytu:</strong> ${format(
          findResevation.dateStart,
          "dd.MM.yyyy"
        )} <strong>Nový dátum začiatku pobytu:</strong> ${format(
        dateStart,
        "dd.MM.yyyy"
      )}</p>
        <p><strong>Bývalý dátum ukončenia pobytu:</strong> ${format(
          findResevation.dateEnd,
          "dd.MM.yyyy"
        )} <strong>Nový dátum ukončenia pobytu:</strong> ${format(
        dateEnd,
        "dd.MM.yyyy"
      )}</p>
        <p><strong>Počet hostí:</strong> ${findResevation.numberOfGuests}</p>
      </div>
      <div>
        <h3>Kontaktné údaje</h3>
        <p><strong>Meno:</strong> ${findResevation.name} ${
        findResevation.surname
      }</p>
        <p><strong>Email:</strong> ${findResevation.email}</p>
        <p><strong>Telefónne číslo:</strong> ${findResevation.phonenumber}</p>
      </div>
      <div>
        <h3>Adresa</h3>
        <p><strong>Ulica:</strong> ${findResevation.street}</p>
        <p><strong>Mesto:</strong> ${findResevation.town}</p>
        <p><strong>PSČ:</strong> ${findResevation.psc}</p>
      </div>
      <div>
        <h3>Ďalšie požiadavky</h3>
        <p>${findResevation.additionalNeeds}</p>
      </div>
    </div>

       <table  style="width: 100%;">
  <tr>
<td align="left">
 <a href="${linkToBackend}/updateReservation?reservationId=${reservationId}&dateStart=${dateStart}&dateEnd=${dateEnd}"  style="display: inline-block; background-color:rgb(20, 147, 29); color: white; text-decoration: none; padding: 10px 20px; text-transform: uppercase; font-weight: bold; border-radius: 5px;">
 Upraviť rezerváciu
    </a>
  </td>
     <td align="right"><a href="${linkToBackend}/deleteReservation/${reservationId}"  style="display: inline-block; background-color:rgb(181, 23, 12); color: white; text-decoration: none; padding: 10px 20px; text-transform: uppercase; font-weight: bold; border-radius: 5px;">
 Zrušiť rezerváciu
    </a></td>
    </tr>

 </table>
  </div>
</div>`;

      await sendEmail(
        adminEmail,
        findResevation.email,
        "Zmena dátumu rezervácie",
        reservationMessage
      );

      await sendEmail(
        adminEmail,
        adminEmail,
        "Zmena dátumu rezervácie",
        reservationMessageAdmin
      );
    }
    res.status(200).json("Rezervácia bola aktualizovaná");
  } catch (error) {
    res.status(401).json(error.message);
    console.log(error.message, "erros");
  }
});

//Review part
app.post("/sennd-review-email", async (req, res) => {
  const { starRating, name, surname, reviewText } = req.body;
  const reviewId = uuidv4();
  const messageAdminReview = `
    <div style="font-family: Arial, sans-serif;background-color: #FFE4C4; width: 100%;">
 ${headerForEmails}
  <div style="padding: 20px;">
 <h2>Recenzia od ${name} ${surname}</h2>
  <p>Dáva vám ${starRating} z 5</p>
  <p><strong>Recenzia</strong></p>
  <p>${reviewText}</p>
   <table  style="width: 100%;">
  <tr>
<td align="left">
 <a href="${linkToBackend}/addReview?reviewId=${reviewId}&name=${name}&surname=${surname}&starRating=${starRating}&reviewText=${reviewText}"  style="display: inline-block; background-color:rgb(20, 147, 29); color: white; text-decoration: none; padding: 10px 20px; text-transform: uppercase; font-weight: bold; border-radius: 5px;">
 Pridať recenziu na stránku
    </a>
  </td>
     <td align="right"><a href="${linkToBackend}/deleteReview/${reviewId}"  style="display: inline-block; background-color:rgb(181, 23, 12); color: white; text-decoration: none; padding: 10px 20px; text-transform: uppercase; font-weight: bold; border-radius: 5px;">
 Odstrániť recenziu zo stránky
    </a></td>
    </tr>

 </table>
  </div>
  
</div>
  `;
  try {
    if (messageAdminReview) {
      sendEmail(adminEmail, adminEmail, "Recenzia", messageAdminReview);
      res.status(200).json("Recenzia bola úspešne poslaná");
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/addReview", async (req, res) => {
  const { reviewId, name, surname, reviewText, starRating } = req.query;
  try {
    const findReview = await ReviewsTable.findOne({ reviewId });
    if (findReview) {
      res.redirect(`${linkToFrontend}/?message=${"Recenzia už bola pridaná"}`);
    } else {
      await ReviewsTable.create({
        reviewId,
        name,
        surname,
        starRating,
        reviewText,
      });

      res.redirect(
        `${linkToFrontend}/?message=${"Recenzia bola úspešne pridaná"}`
      );
    }
  } catch (error) {
    console.log(error.message, "/addReview");
  }
});

app.get("/deleteReview/:reviewId", async (req, res) => {
  const { reviewId } = req.params;

  try {
    const findReview = await ReviewsTable.findOne({ reviewId });
    if (findReview) {
      await ReviewsTable.findOneAndDelete({ reviewId });
      res.redirect(
        `${linkToFrontend}/?message=${"Recenzia bola úspešne odstránená"}`
      );
    } else {
      res.redirect(`${linkToFrontend}/?message=${"Recenzia sa nenašla"}`);
    }
  } catch (error) {
    console.log(error.message, "/deleteReview/:reviewId");
  }
});

app.get("/get-reviews", async (req, res) => {
  try {
    const findReviews = await ReviewsTable.find();
    if (findReviews) {
      res.status(200).json(findReviews);
    } else {
      res.status(400).json([]);
    }
  } catch (error) {
    if (error) {
      res.redirect(`${linkToFrontend}/?message=${error.message}`);
    }
  }
});
