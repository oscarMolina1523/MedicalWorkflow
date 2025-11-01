import { createClient } from "@libsql/client";
import { roleData } from "../data/role.data";
import { departmentData } from "../data/department.data";
import { userData } from "../data/user.data";
import { medicationData } from "../data/medication.data";
import { medicalServiceData } from "../data/medicalService.data";
import { patientData } from "../data/patient.data";
import { appointmentData } from "../data/appointment.data";
import { inventoryData } from "../data/inventory.data";
import { billingData } from "../data/billing.data";
import { expenseData } from "../data/expense.data";

const dbUrl = process.env.TURSO_DB_URL || "not-found";
const token = process.env.TURSO_DB_AUTH_TOKEN || "not-found";

export async function initializeDatabase(): Promise<void> {
  const db = createClient({ url: dbUrl, authToken: token });

  try {
    // ---------------------------
    // ROLES
    // ---------------------------
    await db.execute(`
      CREATE TABLE IF NOT EXISTS ROLES (
        ID TEXT PRIMARY KEY,
        NAME TEXT NOT NULL UNIQUE,
        DESCRIPTION TEXT,
        HIERARCHY_LEVEL INTEGER,
        CREATED_AT TEXT,
        UPDATED_AT TEXT
      );
    `);

    for (const role of roleData) {
      await db.execute(
        `INSERT OR IGNORE INTO ROLES (ID, NAME, DESCRIPTION, HIERARCHY_LEVEL, CREATED_AT, UPDATED_AT) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          role.id,
          role.name,
          role.description,
          role.hierarchyLevel,
          role.createdAt.toISOString(),
          role.updatedAt.toISOString(),
        ]
      );
    }
    console.log("✅ ROLES insertados.");

    // ---------------------------
    // DEPARTMENTS
    // ---------------------------
    await db.execute(`
      CREATE TABLE IF NOT EXISTS DEPARTMENTS (
        ID TEXT PRIMARY KEY,
        NAME TEXT NOT NULL,
        DESCRIPTION TEXT,
        HEAD_ID TEXT,
        CREATED_AT TEXT,
        UPDATED_AT TEXT
      );
    `);

    for (const dept of departmentData) {
      await db.execute(
        `INSERT OR IGNORE INTO DEPARTMENTS (ID, NAME, DESCRIPTION, HEAD_ID, CREATED_AT, UPDATED_AT) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          dept.id,
          dept.name,
          dept.description,
          dept.headId,
          dept.createdAt.toISOString(),
          dept.updatedAt.toISOString(),
        ]
      );
    }
    console.log("✅ DEPARTMENTS insertados.");

    // ---------------------------
    // USERS
    // ---------------------------
    await db.execute(`
      CREATE TABLE IF NOT EXISTS USERS (
        ID TEXT PRIMARY KEY,
        USERNAME TEXT NOT NULL,
        EMAIL TEXT NOT NULL UNIQUE,
        PASSWORD TEXT NOT NULL,
        ROLE_ID TEXT NOT NULL,
        DEPARTMENT_ID TEXT,
        ACTIVE INTEGER,
        CREATED_AT TEXT,
        UPDATED_AT TEXT,
        CREATED_BY TEXT,
        UPDATED_BY TEXT
      );
    `);

    for (const user of userData) {
      await db.execute(
        `INSERT OR IGNORE INTO USERS (ID, USERNAME, EMAIL, PASSWORD, ROLE_ID, DEPARTMENT_ID, ACTIVE, CREATED_AT, UPDATED_AT, CREATED_BY, UPDATED_BY) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          user.id,
          user.username,
          user.email,
          user.password,
          user.roleId,
          user.departmentId ?? null,
          user.active ? 1 : 0,
          user.createdAt.toISOString(),
          user.updatedAt.toISOString(),
          user.createdBy,
          user.updatedBy,
        ]
      );
    }
    console.log("✅ USERS insertados.");

    // ---------------------------
    // MEDICATIONS
    // ---------------------------
    await db.execute(`
      CREATE TABLE IF NOT EXISTS MEDICATIONS (
        ID TEXT PRIMARY KEY,
        NAME TEXT NOT NULL,
        DESCRIPTION TEXT,
        EXPIRATION_DATE TEXT,
        UNIT TEXT NOT NULL,
        ACTIVE INTEGER
      );
    `);

    for (const med of medicationData) {
      await db.execute(
        `INSERT OR IGNORE INTO MEDICATIONS (ID, NAME, DESCRIPTION, EXPIRATION_DATE, UNIT, ACTIVE) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          med.id,
          med.name,
          med.description,
          med.expirationDate?.toISOString() ?? null,
          med.unit,
          med.active ? 1 : 0,
        ]
      );
    }
    console.log("✅ MEDICATIONS insertados.");

    // ---------------------------
    // SERVICES
    // ---------------------------
    await db.execute(`
      CREATE TABLE IF NOT EXISTS SERVICES (
        ID TEXT PRIMARY KEY,
        NAME TEXT NOT NULL,
        DEPARTMENT_ID TEXT NOT NULL,
        BASE_COST REAL,
        ACTIVE INTEGER
      );
    `);

    for (const service of medicalServiceData) {
      await db.execute(
        `INSERT OR IGNORE INTO SERVICES (ID, NAME, DEPARTMENT_ID, BASE_COST, ACTIVE) VALUES (?, ?, ?, ?, ?)`,
        [
          service.id,
          service.name,
          service.departmentId,
          service.baseCost,
          service.active ? 1 : 0,
        ]
      );
    }
    console.log("✅ SERVICES insertados.");

    // ---------------------------
    // PATIENTS
    // ---------------------------
    await db.execute(`
      CREATE TABLE IF NOT EXISTS PATIENTS (
        ID TEXT PRIMARY KEY,
        FIRST_NAME TEXT,
        LAST_NAME TEXT,
        BIRTH_DATE TEXT,
        GENDER TEXT,
        DEPARTMENT_ID TEXT,
        MEDICAL_HISTORY TEXT,
        CREATED_AT TEXT,
        UPDATED_AT TEXT,
        CREATED_BY TEXT,
        UPDATED_BY TEXT
      );
    `);

    for (const patient of patientData) {
      await db.execute(
        `INSERT OR IGNORE INTO PATIENTS (ID, FIRST_NAME, LAST_NAME, BIRTH_DATE, GENDER, DEPARTMENT_ID, MEDICAL_HISTORY, CREATED_AT, UPDATED_AT, CREATED_BY, UPDATED_BY) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          patient.id,
          patient.firstName,
          patient.lastName,
          patient.birthDate.toISOString(),
          patient.gender,
          patient.departmentId,
          patient.medicalHistory,
          patient.createdAt.toISOString(),
          patient.updatedAt.toISOString(),
          patient.createdBy,
          patient.updatedBy,
        ]
      );
    }
    console.log("✅ PATIENTS insertados.");

    // ---------------------------
    // APPOINTMENTS
    // ---------------------------
    await db.execute(`
      CREATE TABLE IF NOT EXISTS APPOINTMENTS (
        ID TEXT PRIMARY KEY,
        PATIENT_ID TEXT,
        DEPARTMENT_ID TEXT,
        DOCTOR_ID TEXT,
        SCHEDULED_AT TEXT,
        STATUS TEXT,
        NOTES TEXT,
        CREATED_AT TEXT,
        UPDATED_AT TEXT,
        CREATED_BY TEXT,
        UPDATED_BY TEXT
      );
    `);

    for (const app of appointmentData) {
      await db.execute(
        `INSERT OR IGNORE INTO APPOINTMENTS (ID, PATIENT_ID, DEPARTMENT_ID, DOCTOR_ID, SCHEDULED_AT, STATUS, NOTES, CREATED_AT, UPDATED_AT, CREATED_BY, UPDATED_BY) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          app.id,
          app.patientId,
          app.departmentId,
          app.doctorId,
          app.scheduledAt.toISOString(),
          app.status,
          app.notes,
          app.createdAt.toISOString(),
          app.updatedAt.toISOString(),
          app.createdBy,
          app.updatedBy,
        ]
      );
    }
    console.log("✅ APPOINTMENTS insertados.");

    // ---------------------------
    // INVENTORY
    // ---------------------------
    await db.execute(`
      CREATE TABLE IF NOT EXISTS INVENTORY (
        ID TEXT PRIMARY KEY,
        DEPARTMENT_ID TEXT,
        MEDICATION_ID TEXT,
        QUANTITY INTEGER,
        CREATED_AT TEXT,
        UPDATED_AT TEXT,
        CREATED_BY TEXT,
        UPDATED_BY TEXT
      );
    `);

    for (const inv of inventoryData) {
      await db.execute(
        `INSERT OR IGNORE INTO INVENTORY (ID, DEPARTMENT_ID, MEDICATION_ID, QUANTITY, CREATED_AT, UPDATED_AT, CREATED_BY, UPDATED_BY) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          inv.id,
          inv.departmentId,
          inv.medicationId,
          inv.quantity,
          inv.createdAt.toISOString(),
          inv.updatedAt.toISOString(),
          inv.createdBy,
          inv.updatedBy,
        ]
      );
    }
    console.log("✅ INVENTORY insertado.");

    // ---------------------------
    // BILLING
    // ---------------------------
    await db.execute(`
      CREATE TABLE IF NOT EXISTS BILLING (
        ID TEXT PRIMARY KEY,
        PATIENT_ID TEXT,
        APPOINTMENT_ID TEXT,
        SERVICE_ID TEXT,
        DEPARTMENT_ID TEXT,
        AMOUNT REAL,
        STATUS TEXT,
        PAYMENT_METHOD TEXT,
        CREATED_AT TEXT,
        PAID_AT TEXT
      );
    `);

    for (const bill of billingData) {
      await db.execute(
        `INSERT OR IGNORE INTO BILLING (ID, PATIENT_ID, APPOINTMENT_ID, SERVICE_ID, DEPARTMENT_ID, AMOUNT, STATUS, PAYMENT_METHOD, CREATED_AT, PAID_AT) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          bill.id,
          bill.patientId,
          bill.appointmentId ?? null,
          bill.serviceId,
          bill.departmentId,
          bill.amount,
          bill.status,
          bill.paymentMethod,
          bill.createdAt.toISOString(),
          bill.paidAt?.toISOString() ?? null,
        ]
      );
    }
    console.log("✅ BILLING insertados.");

    // ---------------------------
    // EXPENSES
    // ---------------------------
    await db.execute(`
      CREATE TABLE IF NOT EXISTS EXPENSES (
        ID TEXT PRIMARY KEY,
        DEPARTMENT_ID TEXT,
        DESCRIPTION TEXT,
        CATEGORY TEXT,
        AMOUNT REAL,
        CREATED_AT TEXT
      );
    `);

    for (const expense of expenseData) {
      await db.execute(
        `INSERT OR IGNORE INTO EXPENSES (ID, DEPARTMENT_ID, DESCRIPTION, CATEGORY, AMOUNT, CREATED_AT) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          expense.id,
          expense.departmentId,
          expense.description,
          expense.category,
          expense.amount,
          expense.createdAt.toISOString(),
        ]
      );
    }
    console.log("✅ EXPENSES insertados.");
    // ---------------------------
    // KPI
    // ---------------------------
    await db.execute(`
      CREATE TABLE IF NOT EXISTS KPI (
        ID TEXT PRIMARY KEY,
        NAME TEXT NOT NULL UNIQUE,
        DEPARTMENT_ID TEXT,
        VALUE REAL NOT NULL,
        METRIC_DATE TEXT NOT NULL,
        CREATED_AT TEXT NOT NULL,
        CREATED_BY TEXT NOT NULL
      );
    `);
    console.log("✅ Tabla KPI creada (sin datos).");

    // TRIGGERS: KPIs automáticos (globales, sin departamento)
// ---------------------------

// ---------------------------
// KPI
// ---------------------------

// 🔹 Crear índice único para permitir UPSERT
await db.execute(`
  CREATE UNIQUE INDEX IF NOT EXISTS idx_kpi_name_date ON KPI(NAME, METRIC_DATE);
`);

// 📅 Diario - Profit
await db.execute(`
  CREATE TRIGGER IF NOT EXISTS trg_kpi_daily_profit
  AFTER INSERT ON BILLING
  BEGIN
    INSERT INTO KPI (ID, NAME, VALUE, METRIC_DATE, CREATED_AT, CREATED_BY)
    VALUES (
      LOWER(HEX(RANDOMBLOB(16))),
      'DAILY_PROFIT',
      (SELECT IFNULL(SUM(B.AMOUNT),0) - IFNULL(SUM(E.AMOUNT),0)
       FROM BILLING B
       LEFT JOIN EXPENSES E ON DATE(E.CREATED_AT)=DATE(NEW.PAID_AT)
       WHERE DATE(B.PAID_AT)=DATE(NEW.PAID_AT)),
      DATE(NEW.PAID_AT),
      DATETIME('now'),
      'system'
    )
    ON CONFLICT(NAME, METRIC_DATE) DO UPDATE SET
      VALUE = (SELECT IFNULL(SUM(B.AMOUNT),0) - IFNULL(SUM(E.AMOUNT),0)
               FROM BILLING B
               LEFT JOIN EXPENSES E ON DATE(E.CREATED_AT)=DATE(NEW.PAID_AT)
               WHERE DATE(B.PAID_AT)=DATE(NEW.PAID_AT)),
      CREATED_AT = DATETIME('now');
  END;
`);

// 📅 Diario - Expenses
await db.execute(`
  CREATE TRIGGER IF NOT EXISTS trg_kpi_daily_expense
  AFTER INSERT ON EXPENSES
  BEGIN
    INSERT INTO KPI (ID, NAME, VALUE, METRIC_DATE, CREATED_AT, CREATED_BY)
    VALUES (
      LOWER(HEX(RANDOMBLOB(16))),
      'DAILY_EXPENSE',
      (SELECT IFNULL(SUM(E.AMOUNT),0)
       FROM EXPENSES E
       WHERE DATE(E.CREATED_AT)=DATE(NEW.CREATED_AT)),
      DATE(NEW.CREATED_AT),
      DATETIME('now'),
      'system'
    )
    ON CONFLICT(NAME, METRIC_DATE) DO UPDATE SET
      VALUE = (SELECT IFNULL(SUM(E.AMOUNT),0)
               FROM EXPENSES E
               WHERE DATE(E.CREATED_AT)=DATE(NEW.CREATED_AT)),
      CREATED_AT = DATETIME('now');
  END;
`);

// 📅 Semanal - Profit
await db.execute(`
  CREATE TRIGGER IF NOT EXISTS trg_kpi_weekly_profit
  AFTER INSERT ON BILLING
  BEGIN
    INSERT INTO KPI (ID, NAME, VALUE, METRIC_DATE, CREATED_AT, CREATED_BY)
    VALUES (
      LOWER(HEX(RANDOMBLOB(16))),
      'WEEKLY_PROFIT',
      (SELECT IFNULL(SUM(B.AMOUNT),0) - IFNULL(SUM(E.AMOUNT),0)
       FROM BILLING B
       LEFT JOIN EXPENSES E 
       ON DATE(E.CREATED_AT) BETWEEN DATE(NEW.PAID_AT,'weekday 0','-6 days') AND DATE(NEW.PAID_AT)
       WHERE DATE(B.PAID_AT) BETWEEN DATE(NEW.PAID_AT,'weekday 0','-6 days') AND DATE(NEW.PAID_AT)),
      DATE(NEW.PAID_AT,'weekday 0','-6 days'),
      DATETIME('now'),
      'system'
    )
    ON CONFLICT(NAME, METRIC_DATE) DO UPDATE SET
      VALUE = (SELECT IFNULL(SUM(B.AMOUNT),0) - IFNULL(SUM(E.AMOUNT),0)
               FROM BILLING B
               LEFT JOIN EXPENSES E 
               ON DATE(E.CREATED_AT) BETWEEN DATE(NEW.PAID_AT,'weekday 0','-6 days') AND DATE(NEW.PAID_AT)
               WHERE DATE(B.PAID_AT) BETWEEN DATE(NEW.PAID_AT,'weekday 0','-6 days') AND DATE(NEW.PAID_AT)),
      CREATED_AT = DATETIME('now');
  END;
`);

// 📅 Semanal - Expenses
await db.execute(`
  CREATE TRIGGER IF NOT EXISTS trg_kpi_weekly_expense
  AFTER INSERT ON EXPENSES
  BEGIN
    INSERT INTO KPI (ID, NAME, VALUE, METRIC_DATE, CREATED_AT, CREATED_BY)
    VALUES (
      LOWER(HEX(RANDOMBLOB(16))),
      'WEEKLY_EXPENSE',
      (SELECT IFNULL(SUM(E.AMOUNT),0)
       FROM EXPENSES E
       WHERE DATE(E.CREATED_AT) BETWEEN DATE(NEW.CREATED_AT,'weekday 0','-6 days') AND DATE(NEW.CREATED_AT)),
      DATE(NEW.CREATED_AT,'weekday 0','-6 days'),
      DATETIME('now'),
      'system'
    )
    ON CONFLICT(NAME, METRIC_DATE) DO UPDATE SET
      VALUE = (SELECT IFNULL(SUM(E.AMOUNT),0)
               FROM EXPENSES E
               WHERE DATE(E.CREATED_AT) BETWEEN DATE(NEW.CREATED_AT,'weekday 0','-6 days') AND DATE(NEW.CREATED_AT)),
      CREATED_AT = DATETIME('now');
  END;
`);

// 📅 Mensual - Profit
await db.execute(`
  CREATE TRIGGER IF NOT EXISTS trg_kpi_monthly_profit
  AFTER INSERT ON BILLING
  BEGIN
    INSERT INTO KPI (ID, NAME, VALUE, METRIC_DATE, CREATED_AT, CREATED_BY)
    VALUES (
      LOWER(HEX(RANDOMBLOB(16))),
      'MONTHLY_PROFIT',
      (SELECT IFNULL(SUM(B.AMOUNT),0) - IFNULL(SUM(E.AMOUNT),0)
       FROM BILLING B
       LEFT JOIN EXPENSES E 
       ON strftime('%Y-%m',E.CREATED_AT)=strftime('%Y-%m',NEW.PAID_AT)
       WHERE strftime('%Y-%m',B.PAID_AT)=strftime('%Y-%m',NEW.PAID_AT)),
      DATE(NEW.PAID_AT,'start of month'),
      DATETIME('now'),
      'system'
    )
    ON CONFLICT(NAME, METRIC_DATE) DO UPDATE SET
      VALUE = (SELECT IFNULL(SUM(B.AMOUNT),0) - IFNULL(SUM(E.AMOUNT),0)
               FROM BILLING B
               LEFT JOIN EXPENSES E 
               ON strftime('%Y-%m',E.CREATED_AT)=strftime('%Y-%m',NEW.PAID_AT)
               WHERE strftime('%Y-%m',B.PAID_AT)=strftime('%Y-%m',NEW.PAID_AT)),
      CREATED_AT = DATETIME('now');
  END;
`);

// 📅 Mensual - Expenses
await db.execute(`
  CREATE TRIGGER IF NOT EXISTS trg_kpi_monthly_expense
  AFTER INSERT ON EXPENSES
  BEGIN
    INSERT INTO KPI (ID, NAME, VALUE, METRIC_DATE, CREATED_AT, CREATED_BY)
    VALUES (
      LOWER(HEX(RANDOMBLOB(16))),
      'MONTHLY_EXPENSE',
      (SELECT IFNULL(SUM(E.AMOUNT),0)
       FROM EXPENSES E
       WHERE strftime('%Y-%m',E.CREATED_AT)=strftime('%Y-%m',NEW.CREATED_AT)),
      DATE(NEW.CREATED_AT,'start of month'),
      DATETIME('now'),
      'system'
    )
    ON CONFLICT(NAME, METRIC_DATE) DO UPDATE SET
      VALUE = (SELECT IFNULL(SUM(E.AMOUNT),0)
               FROM EXPENSES E
               WHERE strftime('%Y-%m',E.CREATED_AT)=strftime('%Y-%m',NEW.CREATED_AT)),
      CREATED_AT = DATETIME('now');
  END;
`);

// 📅 Anual - Profit
await db.execute(`
  CREATE TRIGGER IF NOT EXISTS trg_kpi_yearly_profit
  AFTER INSERT ON BILLING
  BEGIN
    INSERT INTO KPI (ID, NAME, VALUE, METRIC_DATE, CREATED_AT, CREATED_BY)
    VALUES (
      LOWER(HEX(RANDOMBLOB(16))),
      'YEARLY_PROFIT',
      (SELECT IFNULL(SUM(B.AMOUNT),0) - IFNULL(SUM(E.AMOUNT),0)
       FROM BILLING B
       LEFT JOIN EXPENSES E 
       ON strftime('%Y',E.CREATED_AT)=strftime('%Y',NEW.PAID_AT)
       WHERE strftime('%Y',B.PAID_AT)=strftime('%Y',NEW.PAID_AT)),
      DATE(NEW.PAID_AT,'start of year'),
      DATETIME('now'),
      'system'
    )
    ON CONFLICT(NAME, METRIC_DATE) DO UPDATE SET
      VALUE = (SELECT IFNULL(SUM(B.AMOUNT),0) - IFNULL(SUM(E.AMOUNT),0)
               FROM BILLING B
               LEFT JOIN EXPENSES E 
               ON strftime('%Y',E.CREATED_AT)=strftime('%Y',NEW.PAID_AT)
               WHERE strftime('%Y',B.PAID_AT)=strftime('%Y',NEW.PAID_AT)),
      CREATED_AT = DATETIME('now');
  END;
`);

// 📅 Anual - Expenses
await db.execute(`
  CREATE TRIGGER IF NOT EXISTS trg_kpi_yearly_expense
  AFTER INSERT ON EXPENSES
  BEGIN
    INSERT INTO KPI (ID, NAME, VALUE, METRIC_DATE, CREATED_AT, CREATED_BY)
    VALUES (
      LOWER(HEX(RANDOMBLOB(16))),
      'YEARLY_EXPENSE',
      (SELECT IFNULL(SUM(E.AMOUNT),0)
       FROM EXPENSES E
       WHERE strftime('%Y',E.CREATED_AT)=strftime('%Y',NEW.CREATED_AT)),
      DATE(NEW.CREATED_AT,'start of year'),
      DATETIME('now'),
      'system'
    )
    ON CONFLICT(NAME, METRIC_DATE) DO UPDATE SET
      VALUE = (SELECT IFNULL(SUM(E.AMOUNT),0)
               FROM EXPENSES E
               WHERE strftime('%Y',E.CREATED_AT)=strftime('%Y',NEW.CREATED_AT)),
      CREATED_AT = DATETIME('now');
  END;
`);

console.log("✅ Triggers KPI creados correctamente (Profit y Expenses).");



    // ---------------------------
    // AUDIT_LOGS
    // ---------------------------
    await db.execute(`
      CREATE TABLE IF NOT EXISTS AUDIT_LOGS (
        ID TEXT PRIMARY KEY,
        ENTITY TEXT NOT NULL,
        ENTITY_ID TEXT NOT NULL,
        ACTION TEXT NOT NULL,
        CHANGES TEXT,
        PERFORMED_BY TEXT NOT NULL,
        PERFORMED_AT TEXT NOT NULL
      );
    `);
    console.log("✅ Tabla AUDIT_LOGS creada (sin datos).");

    console.log("✅ Base de datos inicializada correctamente en Turso.");
  } catch (error) {
    console.error("❌ Error al inicializar la base de datos:", error);
  } finally {
    await db.close();
  }
}
