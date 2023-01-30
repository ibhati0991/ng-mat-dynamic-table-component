import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { AppComponent } from './app.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TbMatTableComponent } from './components/tb-mat-table/tb-mat-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BaseService } from './services/base.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    HttpClientModule,
  ],
  declarations: [AppComponent, TbMatTableComponent],
  bootstrap: [AppComponent],
  providers: [BaseService],
})
export class AppModule {}
