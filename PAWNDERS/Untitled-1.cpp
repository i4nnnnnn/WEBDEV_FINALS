#include <iostream>
#include <fstream>
#include <iomanip>
using namespace std;

int main() {

    int mainChoice, serviceChoice;
    string customerName, petName, service;
    double price = 0;

    cout << "==============================" << endl;
    cout << "        PawCare System        " << endl;
    cout << "   Pet Service Management     " << endl;
    cout << "==============================" << endl;

    cout << "\n[1] Add / Avail Service";
    cout << "\n[2] View Receipt";
    cout << "\n[3] Update Record";
    cout << "\n[4] Delete Record";
    cout << "\n[5] Exit";

    cout << "\n\nEnter Choice: ";
    cin >> mainChoice;
    cin.ignore();

    // CREATE / AVAIL SERVICE
    if(mainChoice == 1) {

        ofstream file("pawcare.txt");

        cout << "\nEnter Customer Name: ";
        getline(cin, customerName);

        cout << "Enter Pet Name: ";
        getline(cin, petName);

        cout << "\n===== SERVICES =====" << endl;
        cout << "[1] Basic Grooming - PHP 500" << endl;
        cout << "[2] Full Grooming  - PHP 1000" << endl;
        cout << "[3] Nail Trim      - PHP 200" << endl;
        cout << "[4] Vaccination    - PHP 800" << endl;

        cout << "\nChoose Service: ";
        cin >> serviceChoice;

        switch(serviceChoice) {

            case 1:
                service = "Basic Grooming";
                price = 500;
                break;

            case 2:
                service = "Full Grooming";
                price = 1000;
                break;

            case 3:
                service = "Nail Trim";
                price = 200;
                break;

            case 4:
                service = "Vaccination";
                price = 800;
                break;

            default:
                cout << "Invalid Service!" << endl;
                return 0;
        }

        // SAVE RECEIPT FORMAT
        file << "==================================" << endl;
        file << "         PawCare Receipt         " << endl;
        file << "==================================" << endl;
        file << "Customer Name : " << customerName << endl;
        file << "Pet Name      : " << petName << endl;
        file << "Service       : " << service << endl;
        file << "----------------------------------" << endl;
        file << "Total Amount  : PHP " << fixed << setprecision(2) << price << endl;
        file << "==================================" << endl;
        file << "  Thank you for choosing PawCare " << endl;
        file << "==================================" << endl;

        file.close();

        cout << "\nReceipt saved successfully!" << endl;
    }

    // VIEW RECEIPT
    else if(mainChoice == 2) {

        ifstream file("pawcare.txt");
        string line;

        if(file.is_open()) {

            cout << endl;

            while(getline(file, line)) {
                cout << line << endl;
            }

            file.close();
        }
        else {
            cout << "\nNo receipt found!" << endl;
        }
    }

    // UPDATE RECORD
    else if(mainChoice == 3) {

        ofstream file("pawcare.txt");

        cout << "\n===== UPDATE RECORD =====" << endl;

        cout << "Enter New Customer Name: ";
        getline(cin, customerName);

        cout << "Enter New Pet Name: ";
        getline(cin, petName);

        cout << "\n===== SERVICES =====" << endl;
        cout << "[1] Basic Grooming - PHP 500" << endl;
        cout << "[2] Full Grooming  - PHP 1000" << endl;
        cout << "[3] Nail Trim      - PHP 200" << endl;
        cout << "[4] Vaccination    - PHP 800" << endl;

        cout << "\nChoose New Service: ";
        cin >> serviceChoice;

        switch(serviceChoice) {

            case 1:
                service = "Basic Grooming";
                price = 500;
                break;

            case 2:
                service = "Full Grooming";
                price = 1000;
                break;

            case 3:
                service = "Nail Trim";
                price = 200;
                break;

            case 4:
                service = "Vaccination";
                price = 800;
                break;

            default:
                cout << "Invalid Service!" << endl;
                return 0;
        }

        // UPDATED RECEIPT
        file << "==================================" << endl;
        file << "         PawCare Receipt         " << endl;
        file << "==================================" << endl;
        file << "Customer Name : " << customerName << endl;
        file << "Pet Name      : " << petName << endl;
        file << "Service       : " << service << endl;
        file << "----------------------------------" << endl;
        file << "Total Amount  : PHP " << fixed << setprecision(2) << price << endl;
        file << "==================================" << endl;
        file << "  Thank you for choosing PawCare " << endl;
        file << "==================================" << endl;

        file.close();

        cout << "\nRecord Updated Successfully!" << endl;
    }

    // DELETE
    else if(mainChoice == 4) {

        ofstream file("pawcare.txt");

        file << "No Record Found." << endl;

        file.close();

        cout << "\nRecord Deleted Successfully!" << endl;
    }

    // EXIT
    else if(mainChoice == 5) {

        cout << "\nThank you for using PawCare!" << endl;
    }

    else {
        cout << "\nInvalid Choice!" << endl;
    }

    return 0;
}