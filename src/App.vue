<template>
  <div class="letter-generator">
    <h1>PDF Letter Generator</h1>

    <div class="input-form">

      <FirstNameInput v-model="formData.firstName" :error="errors.firstName" />
      <div class="last-name-row">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="formData.lastName" />
        <p v-if="errors.lastName" class="error">{{ errors.lastName }}</p>
      </div>
      <div style="display: flex; flex-direction: column; align-items: flex-start;">
        <label for="address">Address:</label>
        <textarea id="address" v-model="formData.address"></textarea>
        <p v-if="errors.address" class="error">{{ errors.address }}</p>
      </div>
      <div class="city-state-zip">
        <div class="city-container">
          <label for="city">City:</label>
          <input type="text" id="city" v-model="formData.city" class="city-input" />
          <p v-if="errors.city" class="error city-error">{{ errors.city }}</p>
        </div>

        <div class="state-container">
          <label for="state" class="state-label">State:</label>
          <select id="state" v-model="formData.state" class="state-select">
            <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
          </select>
          <p v-if="errors.state" class="error state-error">{{ errors.state }}</p>
        </div>

        <div class="zip-container">
          <label for="zip" class="zip-label">Zip Code:</label>
          <input type="text" id="zip" v-model="formData.zip" class="zip-input" />
          <p v-if="errors.zip" class="error zip-error">{{ errors.zip }}</p>
        </div>
      </div>

      <label for="template">Select Template:</label>
      <select id="template" v-model="selectedTemplate">
        <option v-for="(template, index) in templates" :key="index" :value="index">
          {{ template.name }}
        </option>
      </select>

      <button @click="generatePDF">Generate PDF</button>
    </div>

    <div v-if="pdfUrl" class="pdf-preview">
      <h2>PDF Preview</h2>
      <iframe :src="pdfUrl" width="100%" height="500px"></iframe>
      <a :href="pdfUrl" download="generated-letter.pdf">Download PDF</a>
    </div>
  </div>
</template>

<script>
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import FirstNameInput from './components/FirstNameInput.vue';
import './App.css'; // Import the CSS file

export default {
  components: {
    FirstNameInput, // Register the component here
  },
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
      },
      states: [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
        'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
        'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
        'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
      ],
      templates: [
        {
          name: 'Template 1',
          content: `Dear {{firstName}} {{lastName}}, \n\n<b>This is your address:</b>\n{{address}}\n{{city}}, {{state}} {{zip}}.\n\n`,
        },
        {
          name: 'Template 2',
          content: `Hey {{firstName}} {{lastName}}, \n\n<b>This is your address:</b>\n{{address}}\n{{city}}, {{state}} {{zip}}\n\n`,
          fontSize: 18,
        },
      ],
      selectedTemplate: 0,
      pdfUrl: null,
      errors: {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
      },
    };
  },
  methods: {
    async generatePDF() {
      if (!this.validateForm()) {
        return;
      }
      try {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { height } = page.getSize();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const fontSize = this.templates[this.selectedTemplate].fontSize || 12;
        const text = this.fillTemplate(
          this.templates[this.selectedTemplate].content,
          this.formData,
          font,
          fontBold,
          fontSize
        );

        let currentY = height - 50;
        let currentX = 50;
        const lines = text.split('\n');

        for (const line of lines) {
          const boldText = line.match(/<b>(.*?)<\/b>/);
          if (boldText) {
            const normalTextParts = line.split(/<b>(.*?)<\/b>/);
            for (const part of normalTextParts) {
              if (part) {
                if (part === boldText[1]) {
                  page.drawText(part, {
                    x: currentX,
                    y: currentY,
                    font: fontBold,
                    size: fontSize,
                    color: rgb(0, 0, 0),
                  });
                  currentX += fontBold.widthOfTextAtSize(part, fontSize);
                } else if (part.indexOf("<b>") === -1 && part.indexOf("</b>") === -1) {
                  page.drawText(part, {
                    x: currentX,
                    y: currentY,
                    font: font,
                    size: fontSize,
                    color: rgb(0, 0, 0),
                  });
                  currentX += font.widthOfTextAtSize(part, fontSize);
                }
              }
            }
          } else {
            page.drawText(line, {
              x: 50,
              y: currentY,
              font: font,
              size: fontSize,
              color: rgb(0, 0, 0),
            });
          }
          currentY -= fontSize + 5;
          currentX = 50;
        }

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        this.pdfUrl = URL.createObjectURL(blob);
        console.log(this.pdfUrl);
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF.');
      }
    },
    fillTemplate(template, data) {
      let filledTemplate = template;
      for (const key in data) {
        filledTemplate = filledTemplate.replace(
          new RegExp(`{{${key}}}`, 'g'),
          data[key]
        );
      }
      return filledTemplate;
    },
    validateForm() {
      this.errors = {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
      };
      let isValid = true;

      if (!this.formData.firstName.trim()) {
        this.errors.firstName = 'First Name is required.';
        isValid = false;
      }
      if (!this.formData.lastName.trim()) {
        this.errors.lastName = 'Last Name is required.';
        isValid = false;
      }
      if (!this.formData.address.trim()) {
        this.errors.address = 'Address is required.';
        isValid = false;
      }
      if (!this.formData.city.trim()) {
        this.errors.city = 'City is required.';
        isValid = false;
      }
      if (!this.formData.state) {
        this.errors.state = 'State is required.';
        isValid = false;
      }
      if (!this.formData.zip.trim()) {
        this.errors.zip = 'Zip Code is required.';
        isValid = false;
      }

      return isValid;
    },
  },
};
</script>