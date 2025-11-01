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

    // ---------------------------
    // Triggers para BILLING
    // ---------------------------
    await db.execute(`
CREATE TRIGGER IF NOT EXISTS trg_profit_daily_after_insert
AFTER INSERT ON BILLING
BEGIN
  -- Sumar nuevo billing
  INSERT INTO KPI (ID, NAME, VALUE, METRIC_DATE, CREATED_AT, CREATED_BY)
  VALUES (
    hex(randomblob(16)),
    'profit_' || DATE(NEW.CREATED_AT),
    NEW.AMOUNT,
    DATE(NEW.CREATED_AT),
    DATETIME('now','localtime'),
    'system'
  )
  ON CONFLICT(NAME) DO UPDATE SET
    VALUE = VALUE + NEW.AMOUNT,
    CREATED_AT = DATETIME('now','localtime');

  -- Restar expenses del día correspondiente
  INSERT INTO KPI (ID, NAME, VALUE, METRIC_DATE, CREATED_AT, CREATED_BY)
  VALUES (
    hex(randomblob(16)),
    'profit_' || DATE(NEW.CREATED_AT),
    -COALESCE((SELECT SUM(AMOUNT) FROM EXPENSES WHERE DATE(CREATED_AT) = DATE(NEW.CREATED_AT)),0),
    DATE(NEW.CREATED_AT),
    DATETIME('now','localtime'),
    'system'
  )
  ON CONFLICT(NAME) DO UPDATE SET
    VALUE = VALUE - COALESCE((SELECT SUM(AMOUNT) FROM EXPENSES WHERE DATE(CREATED_AT) = DATE(NEW.CREATED_AT)),0),
    CREATED_AT = DATETIME('now','localtime');

  -- KPI semanal de profit
  INSERT INTO KPI (ID, NAME, VALUE, METRIC_DATE, CREATED_AT, CREATED_BY)
  SELECT
    hex(randomblob(16)),
    'profit_week_' || strftime('%W', NEW.CREATED_AT) || '-' || strftime('%Y', NEW.CREATED_AT),
    COALESCE((SELECT SUM(AMOUNT) FROM BILLING WHERE strftime('%W', CREATED_AT)=strftime('%W', NEW.CREATED_AT) AND strftime('%Y', CREATED_AT)=strftime('%Y', NEW.CREATED_AT)),0)
    - COALESCE((SELECT SUM(AMOUNT) FROM EXPENSES WHERE strftime('%W', CREATED_AT)=strftime('%W', NEW.CREATED_AT) AND strftime('%Y', CREATED_AT)=strftime('%Y', NEW.CREATED_AT)),0),
    DATE(NEW.CREATED_AT),
    DATETIME('now'),
    'system'
  ON CONFLICT(NAME) DO UPDATE SET VALUE=excluded.VALUE, CREATED_AT=excluded.CREATED_AT;

  -- KPI mensual de profit
  INSERT INTO KPI (ID, NAME, VALUE, METRIC_DATE, CREATED_AT, CREATED_BY)
  SELECT
    hex(randomblob(16)),
    'profit_month_' || strftime('%m', NEW.CREATED_AT) || '-' || strftime('%Y', NEW.CREATED_AT),
    COALESCE((SELECT SUM(AMOUNT) FROM BILLING WHERE strftime('%m', CREATED_AT)=strftime('%m', NEW.CREATED_AT) AND strftime('%Y', CREATED_AT)=strftime('%Y', NEW.CREATED_AT)),0)
    - COALESCE((SELECT SUM(AMOUNT) FROM EXPENSES WHERE strftime('%m', CREATED_AT)=strftime('%m', NEW.CREATED_AT) AND strftime('%Y', CREATED_AT)=strftime('%Y', NEW.CREATED_AT)),0),
    DATE(NEW.CREATED_AT),
    DATETIME('now'),
    'system'
  ON CONFLICT(NAME) DO UPDATE SET VALUE=excluded.VALUE, CREATED_AT=excluded.CREATED_AT;

  -- KPI anual de profit
  INSERT INTO KPI (ID, NAME, VALUE, METRIC_DATE, CREATED_AT, CREATED_BY)
  SELECT
    hex(randomblob(16)),
    'profit_year_' || strftime('%Y', NEW.CREATED_AT),
    COALESCE((SELECT SUM(AMOUNT) FROM BILLING WHERE strftime('%Y', CREATED_AT)=strftime('%Y', NEW.CREATED_AT)),0)
    - COALESCE((SELECT SUM(AMOUNT) FROM EXPENSES WHERE strftime('%Y', CREATED_AT)=strftime('%Y', NEW.CREATED_AT)),0),
    DATE(NEW.CREATED_AT),
    DATETIME('now'),
    'system'
  ON CONFLICT(NAME) DO UPDATE SET VALUE=excluded.VALUE, CREATED_AT=excluded.CREATED_AT;
END;
`);

    // ---------------------------
    // Trigger para EXPENSES
    // ---------------------------
    await db.execute(`
CREATE TRIGGER IF NOT EXISTS trg_expenses_after_insert
AFTER INSERT ON EXPENSES
BEGIN
  -- KPI diario de expenses
  INSERT INTO KPI (ID, NAME, VALUE, METRIC_DATE, CREATED_AT, CREATED_BY)
  SELECT
    hex(randomblob(16)),
    'expenses_' || DATE(NEW.CREATED_AT),
    COALESCE((SELECT SUM(AMOUNT) FROM EXPENSES WHERE DATE(CREATED_AT)=DATE(NEW.CREATED_AT)),0),
    DATE(NEW.CREATED_AT),
    DATETIME('now'),
    'system'
  ON CONFLICT(NAME) DO UPDATE SET VALUE=excluded.VALUE, CREATED_AT=excluded.CREATED_AT;

  -- KPI semanal de expenses
  INSERT INTO KPI (ID, NAME, VALUE, METRIC_DATE, CREATED_AT, CREATED_BY)
  SELECT
    hex(randomblob(16)),
    'expenses_week_' || strftime('%W', NEW.CREATED_AT) || '-' || strftime('%Y', NEW.CREATED_AT),
    COALESCE((SELECT SUM(AMOUNT) FROM EXPENSES WHERE strftime('%W', CREATED_AT)=strftime('%W', NEW.CREATED_AT) AND strftime('%Y', CREATED_AT)=strftime('%Y', NEW.CREATED_AT)),0),
    DATE(NEW.CREATED_AT),
    DATETIME('now'),
    'system'
  ON CONFLICT(NAME) DO UPDATE SET VALUE=excluded.VALUE, CREATED_AT=excluded.CREATED_AT;

  -- KPI mensual de expenses
  INSERT INTO KPI (ID, NAME, VALUE, METRIC_DATE, CREATED_AT, CREATED_BY)
  SELECT
    hex(randomblob(16)),
    'expenses_month_' || strftime('%m', NEW.CREATED_AT) || '-' || strftime('%Y', NEW.CREATED_AT),
    COALESCE((SELECT SUM(AMOUNT) FROM EXPENSES WHERE strftime('%m', CREATED_AT)=strftime('%m', NEW.CREATED_AT) AND strftime('%Y', CREATED_AT)=strftime('%Y', NEW.CREATED_AT)),0),
    DATE(NEW.CREATED_AT),
    DATETIME('now'),
    'system'
  ON CONFLICT(NAME) DO UPDATE SET VALUE=excluded.VALUE, CREATED_AT=excluded.CREATED_AT;

  -- KPI anual de expenses
  INSERT INTO KPI (ID, NAME, VALUE, METRIC_DATE, CREATED_AT, CREATED_BY)
  SELECT
    hex(randomblob(16)),
    'expenses_year_' || strftime('%Y', NEW.CREATED_AT),
    COALESCE((SELECT SUM(AMOUNT) FROM EXPENSES WHERE strftime('%Y', CREATED_AT)=strftime('%Y', NEW.CREATED_AT)),0),
    DATE(NEW.CREATED_AT),
    DATETIME('now'),
    'system'
  ON CONFLICT(NAME) DO UPDATE SET VALUE=excluded.VALUE, CREATED_AT=excluded.CREATED_AT;
END;
`);

    console.log("✅ Base de datos inicializada correctamente en Turso.");
  } catch (error) {
    console.error("❌ Error al inicializar la base de datos:", error);
  } finally {
    await db.close();
  }
}
